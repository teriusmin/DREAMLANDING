import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ConsultationRequest } from '../types';
import { motion } from 'motion/react';
import { Search, Filter, Phone, Calendar, RefreshCw, CheckCircle, Clock, AlertTriangle, FileText, Check, Save } from 'lucide-react';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  
  // Local state for tracking note edits: map of { requestId: noteText }
  const [editedNotes, setEditedNotes] = useState<{ [key: string]: string }>({});
  const [savingNotesId, setSavingNotesId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, 'consultations');
    const q = query(colRef, orderBy('createdAt', 'desc'));

    // Realtime snapshot listener conforming strictly to error callback constraints
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: ConsultationRequest[] = [];
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...(doc.data() as Omit<ConsultationRequest, 'id'>)
          });
        });
        setRequests(list);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError('데이터를 불러오는 중 권한 요건 또는 서버 오차가 감지되었습니다.');
        setLoading(false);
        try {
          handleFirestoreError(err, OperationType.LIST, 'consultations');
        } catch (fErr) {
          // Soft log error conforms to guidelines
        }
      }
    );

    return unsubscribe;
  }, []);

  const handleStatusChange = async (reqId: string, newStatus: 'pending' | 'contacting' | 'completed' | 'cancelled') => {
    const docRef = doc(db, 'consultations', reqId);
    try {
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error(err);
      alert('상태를 수정할 권한이 없거나 네트워크 지연이 생겼습니다.');
      try {
        handleFirestoreError(err, OperationType.UPDATE, `consultations/${reqId}`);
      } catch (fErr) {
        // Soft catch
      }
    }
  };

  const handleNotesSave = async (reqId: string) => {
    const noteText = editedNotes[reqId] || '';
    setSavingNotesId(reqId);
    const docRef = doc(db, 'consultations', reqId);
    try {
      await updateDoc(docRef, {
        notes: noteText.trim(),
        updatedAt: serverTimestamp()
      });
      // Clear notes edit status
      const updatedEditedNotes = { ...editedNotes };
      delete updatedEditedNotes[reqId];
      setEditedNotes(updatedEditedNotes);
    } catch (err) {
      console.error(err);
      alert('메모를 저장할 권한이 없거나 네트워크 지연이 발생했습니다.');
      try {
        handleFirestoreError(err, OperationType.UPDATE, `consultations/${reqId}`);
      } catch (fErr) {
        // Soft catch
      }
    } finally {
      setSavingNotesId(null);
    }
  };

  // Status counters
  const totalCount = requests.length;
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const contactingCount = requests.filter(r => r.status === 'contacting').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;
  const cancelledCount = requests.filter(r => r.status === 'cancelled').length;

  // Filter & Search computation
  const filteredRequests = requests.filter((r) => {
    const matchesSearch = 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesProduct = productFilter === 'all' || r.productType.includes(productFilter);

    return matchesSearch && matchesStatus && matchesProduct;
  });

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '-';
    // Convert Firestore timestamp to JS Date
    const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return d.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10" id="admin-dashboard-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              드림텔레콤 상담 관리자 센터
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              신청인 현황을 실시간으로 확인하고 관리하는 통합 통제 대시보드입니다. (접근 대상: teriusmin@gmail.com)
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 bg-white shadow-sm border border-slate-200 px-3 py-2 rounded-lg">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
            <span>실시간 자동 갱신 중</span>
          </div>
        </div>

        {/* Counter cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block mb-1">총 신청 건수</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-display">{totalCount}건</span>
          </div>
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200/60 shadow-sm">
            <span className="text-xs font-bold text-amber-500 block mb-1">대기 중</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600 font-display">{pendingCount}건</span>
          </div>
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200/60 shadow-sm">
            <span className="text-xs font-bold text-blue-500 block mb-1">상담 진행</span>
            <span className="text-2xl sm:text-3xl font-black text-blue-600 font-display">{contactingCount}건</span>
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200/60 shadow-sm">
            <span className="text-xs font-bold text-emerald-500 block mb-1">개통 완료</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-display">{completedCount}건</span>
          </div>
          <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-500 block mb-1">상담 취소</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-600 font-display">{cancelledCount}건</span>
          </div>
        </div>

        {/* Filters and Search toolbar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-display flex items-center">
            <Filter className="w-4 h-4 mr-2 text-slate-500" />
            <span>신청인 검색 및 필터 필터링</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input 
                type="text"
                placeholder="이름 또는 연락처 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-kt-red focus:bg-white rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-kt-red focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-all font-medium"
            >
              <option value="all">모든 상태 필터</option>
              <option value="pending">대기 중 (Pending)</option>
              <option value="contacting">상담 진행 (Contacting)</option>
              <option value="completed">개통 완료 (Completed)</option>
              <option value="cancelled">상담 취소 (Cancelled)</option>
            </select>

            {/* Product Filter */}
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-kt-red focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-all font-medium"
            >
              <option value="all">모든 희망 상품 필터</option>
              <option value="KT 인터넷">KT 인터넷 전체</option>
              <option value="스카이라이프">KT스카이라이프 전체</option>
              <option value="미정">상품 미선택 / 상담 후 결정</option>
            </select>

          </div>
        </div>

        {/* Dashboard table / list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 border-4 border-kt-red border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-bold text-slate-500">신청 데이터를 정렬 중입니다...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-red-50 text-red-600 rounded-3xl border border-red-200 shadow-sm space-y-3">
            <AlertTriangle className="w-10 h-10 text-red-500" />
            <span className="text-sm font-bold">{error}</span>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3 text-center">
            <FileText className="w-10 h-10 text-slate-300" />
            <h4 className="text-base font-bold text-slate-700">검색 조건에 부합하는 가입 신청건이 없습니다.</h4>
            <p className="text-xs text-slate-400">새로운 신청서가 수집될 때까지 대시보드가 대기합니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4" id="consultation-list-grid">
            {filteredRequests.map((req) => (
              <div 
                key={req.id} 
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col md:flex-row md:items-stretch justify-between gap-6"
                id={`admin-request-card-${req.id}`}
              >
                {/* Left Area: Main Request info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-black text-slate-900 font-display">{req.name}</span>
                    <a 
                      href={`tel:${req.phone}`}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      title="전화 걸기"
                    >
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>{req.phone}</span>
                    </a>
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                      {req.productType}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-300" />
                      <span>신청: {formatDate(req.createdAt)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-300" />
                      <span>수정: {formatDate(req.updatedAt)}</span>
                    </span>
                  </div>

                  {/* Consent Check & Attachments */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                    <span className="inline-flex items-center space-x-1 text-slate-500 font-bold bg-slate-100 px-2.5 py-1 rounded-lg">
                      <span>제3자 제공동의:</span>
                      <span className={req.thirdPartyAgree ? "text-emerald-600" : "text-amber-600"}>
                        {req.thirdPartyAgree ? "완료" : "미동의"}
                      </span>
                    </span>
                    {req.attachedFiles && req.attachedFiles.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-slate-400 font-bold">첨부파일 ({req.attachedFiles.length}):</span>
                        {req.attachedFiles.map((file, fIdx) => (
                          <span 
                            key={fIdx} 
                            className="inline-flex items-center space-x-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg hover:bg-slate-200 transition-colors"
                            title={`${file.name} (${(file.size / 1024).toFixed(1)} KB)`}
                          >
                            <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium">({(file.size / 1024).toFixed(1)}KB)</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Notes editing field */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-bold text-slate-400">상담 관리 메모</label>
                    <div className="flex items-center space-x-2 max-w-xl">
                      <input 
                        type="text"
                        placeholder="이곳에 상담 메모를 입력해 보세요"
                        value={
                          editedNotes[req.id] !== undefined 
                            ? editedNotes[req.id] 
                            : req.notes || ''
                        }
                        onChange={(e) => {
                          setEditedNotes({
                            ...editedNotes,
                            [req.id]: e.target.value
                          });
                        }}
                        className="flex-1 bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-300 px-3 py-2 text-xs rounded-xl outline-none font-semibold text-slate-800"
                      />
                      {(editedNotes[req.id] !== undefined && editedNotes[req.id] !== (req.notes || '')) && (
                        <button
                          onClick={() => handleNotesSave(req.id)}
                          disabled={savingNotesId === req.id}
                          className="flex items-center space-x-1 bg-slate-900 text-white px-3 py-2 text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Save className="w-3 h-3" />
                          <span>저장</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Area: Status control Panel */}
                <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 gap-4 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">진행 현황</span>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        req.status === 'pending' ? 'bg-amber-500 animate-pulse' :
                        req.status === 'contacting' ? 'bg-blue-500 animate-pulse' :
                        req.status === 'completed' ? 'bg-emerald-500' :
                        'bg-slate-400'
                      }`}></span>
                      <span className="text-sm font-black text-slate-800">
                        {req.status === 'pending' ? '대기 중' :
                         req.status === 'contacting' ? '상담 진행' :
                         req.status === 'completed' ? '개통 완료' :
                         '상담 취소'}
                      </span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                    <button
                      onClick={() => handleStatusChange(req.id, 'pending')}
                      className={`px-2 py-1.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                        req.status === 'pending'
                          ? 'bg-amber-500 text-white'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                      title="대기 중으로 이송"
                    >
                      대기
                    </button>
                    <button
                      onClick={() => handleStatusChange(req.id, 'contacting')}
                      className={`px-2 py-1.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                        req.status === 'contacting'
                          ? 'bg-blue-500 text-white'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                      title="상담 개시"
                    >
                      상담
                    </button>
                    <button
                      onClick={() => handleStatusChange(req.id, 'completed')}
                      className={`px-2 py-1.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                        req.status === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                      title="개통 완료 조치"
                    >
                      완료
                    </button>
                    <button
                      onClick={() => handleStatusChange(req.id, 'cancelled')}
                      className={`px-2 py-1.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                        req.status === 'cancelled'
                          ? 'bg-slate-400 text-white'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                      title="상담 반려/취소"
                    >
                      취소
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
