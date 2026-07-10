import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertCircle, Sparkles, CheckCircle2, ChevronDown, ChevronUp, Clock, Info } from 'lucide-react';

interface ConsultationFormProps {
  selectedProduct: string;
}

export default function ConsultationForm({ selectedProduct }: ConsultationFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [productType, setProductType] = useState('KT 인터넷');
  const [agree, setAgree] = useState(false);
  const [agreeThirdParty, setAgreeThirdParty] = useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const [showThirdPartyDetails, setShowThirdPartyDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync selected product from parent
  useEffect(() => {
    if (selectedProduct) {
      setProductType(selectedProduct);
    }
  }, [selectedProduct]);

  // Phone number automatic formatting: 010-XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    let formatted = rawVal;
    if (rawVal.length > 3 && rawVal.length <= 7) {
      formatted = `${rawVal.slice(0, 3)}-${rawVal.slice(3)}`;
    } else if (rawVal.length > 7) {
      formatted = `${rawVal.slice(0, 3)}-${rawVal.slice(3, 7)}-${rawVal.slice(7, 11)}`;
    }
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('이름을 입력해 주세요.');
      return;
    }
    if (phone.length < 12) {
      setErrorMsg('정확한 연락처(예: 010-1234-5678)를 입력해 주세요.');
      return;
    }
    if (!agree) {
      setErrorMsg('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }
    if (!agreeThirdParty) {
      setErrorMsg('개인정보 제3자 제공에 동의해 주세요.');
      return;
    }

    setLoading(true);

    // Generate a valid ID complying with '^[a-zA-Z0-9_\-]+$'
    const reqId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const path = `consultations/${reqId}`;

    const payload: any = {
      name: name.trim(),
      phone: phone,
      productType: productType,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      thirdPartyAgree: agreeThirdParty
    };

    try {
      // 1. Submit the data to Formspree
      const formspreeResponse = await fetch("https://formspree.io/f/xpqgglel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone,
          productType: productType,
          thirdPartyAgree: agreeThirdParty ? "동의함" : "동의안함",
          agreePersonal: agree ? "동의함" : "동의안함",
          requestId: reqId,
          submittedAt: new Date().toLocaleString('ko-KR')
        })
      });

      if (!formspreeResponse.ok) {
        throw new Error('Formspree submission failed with status: ' + formspreeResponse.status);
      }

      // 2. Local Firestore backup for administrator reference and analytics
      try {
        await setDoc(doc(db, 'consultations', reqId), payload);
      } catch (firestoreErr) {
        console.warn('Firestore backup failed, but continuing as Formspree collected the lead:', firestoreErr);
      }

      setSubmitted(true);
      
      // Reset Form State
      setName('');
      setPhone('');
      setAgree(false);
      setAgreeThirdParty(false);
    } catch (err) {
      console.error(err);
      setErrorMsg('상담 신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (fErr) {
        // Log to console but don't crash UI entirely
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden" id="consultation-form-section">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ED1C24_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kt-red/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-kt-red/20 border border-kt-red/40 text-red-400 text-xs font-bold tracking-wider mb-4 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>최대 42만원 + 비밀지원금 즉시 지급 혜택</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-display text-white">
            지금 신청하면 즉시 맞춤 견적 안내
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            10초만 투자해 간단히 작성해 보세요. 전문 상담원이 가장 합리적인 가이드를 선사해 드립니다.
          </p>
        </div>

        <div className="bg-slate-950/40 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
                id="form-consultation"
              >
                {/* Form Title banner */}
                <div className="bg-gradient-to-r from-red-600/20 to-orange-500/20 rounded-xl p-4 border border-kt-red/20 text-center">
                  <span className="text-sm font-black text-yellow-300 tracking-wide">
                    💰 최대 42만원 + 특별 비밀 추가 지원금 상담 대상 포함
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-bold text-slate-300">이름</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="성함을 입력해 주세요"
                      maxLength={40}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-kt-red focus:ring-1 focus:ring-kt-red/20 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white font-medium outline-none transition-all placeholder:text-slate-600"
                      disabled={loading}
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-bold text-slate-300">연락처</label>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="010-____-____"
                      maxLength={13}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-kt-red focus:ring-1 focus:ring-kt-red/20 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white font-mono font-medium outline-none transition-all placeholder:text-slate-600"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Product Type select */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-bold text-slate-300">가입 희망 상품</label>
                  <select 
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-kt-red focus:ring-1 focus:ring-kt-red/20 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white font-medium outline-none transition-all"
                    disabled={loading}
                  >
                    <option value="KT 인터넷 (100M)">KT 인터넷 - 100M 슬림 (기본 웹서핑)</option>
                    <option value="KT 인터넷 (500M)">KT 인터넷 - 500M 에센스 (스트리밍/게이밍)</option>
                    <option value="KT 인터넷 (1G)">KT 인터넷 - 1G 프리미엄 (대용량 업로드/전문가)</option>
                    <option value="KT 스카이라이프 (인터넷+TV 결합)">KT스카이라이프 - 가성비 인터넷+TV 결합</option>
                    <option value="미정 (상담 후 추천)">미정 (전문가와 상담 후 추천 요금 매칭)</option>
                  </select>
                </div>

                {/* Unified Privacy Consent Container Box */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-3 sm:p-5 space-y-4 pt-4">
                  {/* All Agree Header Checkbox */}
                  <div className="flex items-center pb-3 border-b border-slate-800/80">
                    <label className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer select-none w-full">
                      <input
                        type="checkbox"
                        checked={agree && agreeThirdParty}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setAgree(val);
                          setAgreeThirdParty(val);
                        }}
                        className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-kt-red focus:ring-0 focus:ring-offset-0 cursor-pointer accent-kt-red shrink-0"
                        disabled={loading}
                      />
                      <span className="text-xs sm:text-base font-black text-white leading-tight">
                        개인정보 수집 및 이용, 제3자 제공에 모두 동의합니다.
                      </span>
                    </label>
                  </div>

                  {/* Individual Items */}
                  <div className="space-y-4">
                    {/* Item 1: Personal Information Collection Consent */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] xs:text-xs sm:text-sm gap-2">
                        <label className="flex items-center space-x-2 cursor-pointer select-none min-w-0 shrink">
                          <input 
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-kt-red focus:ring-0 focus:ring-offset-0 cursor-pointer accent-kt-red shrink-0"
                            disabled={loading}
                          />
                          <span className="font-bold text-slate-300 whitespace-nowrap">
                            개인정보 수집 및 이용에 동의합니다. <span className="text-kt-red">(필수)</span>
                          </span>
                        </label>

                        <button
                          type="button"
                          onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                          className="text-[11px] xs:text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center space-x-0.5 border border-transparent hover:border-red-400/10 rounded px-1 py-0.5 shrink-0"
                        >
                          <span className="whitespace-nowrap">자세히 보기</span>
                          {showPrivacyDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>

                      {/* Privacy Details Collapsible */}
                      <AnimatePresence>
                        {showPrivacyDetails && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 sm:p-5 text-xs text-slate-400 space-y-4 font-medium leading-relaxed max-h-80 overflow-y-auto">
                              <div className="flex items-center text-slate-200 font-bold space-x-1 border-b border-slate-800 pb-2 mb-1">
                                <Info className="w-3.5 h-3.5 text-kt-red" />
                                <span className="text-sm font-bold font-display">개인정보처리방침 동의</span>
                              </div>

                              <p className="text-slate-400">정보통신망이용촉진및정보보호등에관한법률(이하 “정보통신망법”) 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보취급방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.</p>
                              
                              <ul className="border-y border-slate-850 py-3 my-2 space-y-1 text-slate-400 pl-1 list-none">
                                <li>제 1 장 개인정보의 수집 및 이용 목적</li>
                                <li>제 2 장 수집하는 개인정보 항목 및 수집방법</li>
                                <li>제 3 장 수집한 개인정보의 보유 및 이용기간</li>
                                <li>제 4 장 정보의 제공 및 영리목적 광고 전송</li>
                                <li>제 5 장 개인정보의 제3자 제공</li>
                                <li>제 6 장 개인정보의 제공 및 공유</li>
                                <li>제 7 장 수집한 개인정보의 위탁</li>
                                <li>제 8 장 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항</li>
                                <li>제 9 장 개인정보보호를 위한 기술적/관리적 대책</li>
                                <li>제 10 장 이용자 및 법정대리인의 권리와 그 행사방법</li>
                                <li>제 11 장 개인정보관리책임자 및 상담, 신고</li>
                                <li>제 12 장 고지</li>
                              </ul>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 1 장 개인정보의 수집 및 이용 목적</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  개인정보는 생존하는 개인에 관한 정보로서 실명, 주민등록번호 등의 사항으로 회원 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함)를 말합니다. 회사가 수집한 개인정보는 다음의 목적을 위해 활용합니다.
                                </p>
                                <p className="text-slate-450 leading-relaxed pl-2">
                                  <strong>1. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</strong><br />
                                  콘텐츠 제공, 물품배송 또는 청구서 등 발송, 본인 인증 및 구매, 요금 결재, 요금추심
                                </p>
                                <p className="text-slate-450 leading-relaxed pl-2">
                                  <strong>2. 회원 관리</strong><br />
                                  회원제 서비스 이용에 따른 본인 확인, 개인식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 가입 및 가입횟수 제한, 만14세 미만 아동 개인 정보 수집 시 법정 대리인 동의여부 확인, 추후 법정 대리인 본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달
                                </p>
                                <p className="text-slate-450 leading-relaxed pl-2">
                                  <strong>3. 마케팅 및 광고에 활용</strong><br />
                                  신규 서비스(제품) 개발 및 특화, 인구통계학적 특성에 따른 서비스 제공 및 광고게재, 접속 빈도 파악, 회원의 서비스 이용에 대한 통계, 이벤트 등 광고성 정보 전달 (회원님의 개인정보는 광고를 의뢰한 개인이나 단체에는 제공되지 않습니다.)
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 2 장 수집하는 개인정보 항목 및 수집방법</h4>
                                <p className="text-slate-300 font-semibold">[ 수집하는 개인정보 항목 ]</p>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  1. 최초 회원가입 시 회원식별 및 최적화 된 서비스 제공을 위해 아래와 같은 정보를 수집합니다.<br />
                                  – 필수항목: 아이디, 비밀번호, 이름/기업명, 담당자명(기업회원의 경우), 이메일주소, 주소, 전화번호, 휴대전화번호, 만14세 미만인 경우 법정대리인 정보<br />
                                  – 선택항목: 팩스번호, 영문명/영문 주소(도메인관리 규정상의 필수 정보 확보), 이용자의 휴대폰 주소록내의 제3자의 전화번호 (모바일 이용시), 기기고유번호(모바일이용시 디바이스 아이디 또는 IMEI)<br />
                                  – 유료 정보 및 서비스 이용에 따른 결제수단: 은행정보, 신용카드 정보
                                </p>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  2. 서비스 이용과정이나 사업 처리과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.<br />
                                  – 서비스 이용기록, 접속로그, 쿠키, 접속IP 정보, 결제기록, 불량이용 기록, 이용자 상태정보, 사진, 방문 일시, 성별, 생년월일, 직업, 회사명
                                </p>
                                <p className="text-slate-300 font-semibold">[ 수집방법 ]</p>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  회사는 다음과 같은 방법으로 개인정보를 수집합니다.<br />
                                  1. 홈페이지를 통한 회원가입, 상담 게시판, 경품 행사응모, 배송 요청<br />
                                  2. 생성정보 수집 툴을 통한 수집<br />
                                  3. 서비스 사용 중 이용자의 자발적 제공을 통한 수집
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 3 장 수집한 개인정보의 보유 및 이용기간</h4>
                                <p className="text-slate-405 leading-relaxed">
                                  원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체없이 파기합니다.<br />
                                  단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간동안 보존합니다.
                                </p>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  <strong>1. 회원탈퇴 시 보존 개인정보</strong><br />
                                  – 보존항목: 회원님께서 제공한 이름, 아이디, 이메일주소, 주소, 전화번호 등<br />
                                  – 보존근거: 불량 이용자의 재가입 방지, 명예훼손 등 권리침해 분쟁 및 수사협조<br />
                                  – 보존기간: 회원탈퇴 후 1년
                                </p>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  <strong>2. 상법, 전자상거래등에서의소비자보호에관한법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.</strong><br />
                                  – 계약 또는 청약철회 등에 관한 기록 (보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률, 보존 기간 : 5년)<br />
                                  – 대금결제 및 재화 등의 공급에 관한 기록 (보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률, 보존 기간 : 5년)<br />
                                  – 소비자의 불만 또는 분쟁처리에 관한 기록 (보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률, 보존 기간 : 3년)<br />
                                  – 방문에 관한 기록 (보존 이유 : 통신비밀보호법, 보존 기간 : 3개월)
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 4 장 정보의 제공 및 영리목적 광고 전송</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  회사 회원이 서비스 이용 중 필요가 있다고 인정되는 다양한 정보에 대해서는 전화, SMS, PUSH 등의 다양한 방법으로 회원에게 제공할 수 있습니다. 단, 수취를 거부한 회원에게는 제공하지 않습니다. 간편회원가입, 회원가입 및 이벤트 신청으로 접수된 회원은 영리목적 광고성 정보가 전화, SMS, PUSH로 제공 될 수 있습니다. 단, 수취를 거부한 회원에게는 제공하지 않습니다.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 5 장 개인정보의 제3자 제공</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  회사는 정보주체의 개인정보를 이용목적 내에서만 처리하며, 정보 주체의 동의, 법률의 특별한 규정이 있는 경우에만 개인정보를 제3자에게 제공합니다. 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.<br />
                                  1. 제공하는 개인정보 항목 : 성함, 연락처<br />
                                  2. 제공받는 자의 개인정보 이용목적 : 서비스 제공에 관한 이행 및 서비스 제공에 따른 콘텐츠제공, 고객을 대상으로 제품 상담 응대 및 판매 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 상담, 요금정산, 구매 및 요금결제, 구매내역, 물품배송 또는 청구지 등 발송, 회원 관리 등<br />
                                  3. 제공하는 개인정보 항목 : 이름, 나이, 연락처, 주소, 이메일<br />
                                  4. 제공받는 자의 보유 이용기간 : 5년 (소비자의 불만 또는 분쟁처리에 관한 기록 : 3년)<br />
                                  5. 고객은 제3자 개인정보 제공에 대하여 동의를 거부할 권리가 있으며 동의를 거부할 경우 서비스 제공 및 서비스 제공에 따른 콘텐츠 제공에 제한이 있을 수 있습니다.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 6 장 개인정보의 제공 및 공유</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  원칙적으로 회사는 회원님의 개인정보를 수집 및 이용목적에 한해서만 이용하며 타인 또는 타기업/기관에 공개하지 않습니다. 다만, 이용자들이 사전에 동의한 경우나 법령의 규정에 의거한 경우, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우 등 예외가 존재합니다.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 7 장 수집한 개인정보의 위탁</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  회사는 서비스 향상을 위해서 개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 8 장 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  회원님 개개인에게 개인화되고 맞춤화된 서비스를 제공하기 위해서 회사는 회원님의 정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 사용자의 브라우저에게 보내는 조그마한 데이터 꾸러미로 회원님 컴퓨터의 하드디스크에 저장됩니다. 브라우저 옵션을 통해 쿠키 저장을 거부할 수 있습니다.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 9 장 개인정보보호를 위한 기술적/관리적 대책</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  회원 개개인의 개인정보는 비밀번호 및 안전한 데이터 보안 기능으로 철저히 보호되고 있으며, 백신 프로그램과 방화벽 등의 조치를 통해 바이러스 및 네트워크 위협으로부터 삼중으로 대응하고 있습니다.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 10 장 이용자 및 법정대리인의 권리와 그 행사방법</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  이용자 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 11 장 개인정보관리책임자 및 상담, 신고</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  고객의 개인정보를 보호하고 관련 불만을 처리하기 위하여 개인정보관리책임자를 지정하여 운영하고 있습니다. 개인정보침해에 대한 신고나 상담이 필요하신 경우 개인분쟁조정위원회, 대검찰청 인터넷범죄수사센터, 경찰청 사이버테러대응센터 등에 문의할 수 있습니다.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-slate-200 font-bold text-[13px]">제 12 장 고지</h4>
                                <p className="text-slate-400 leading-relaxed pl-1">
                                  법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는 변경사항 시행일 7일 전부터 공지사항을 통하여 고지합니다.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Item 2: Third Party Information Provision Consent */}
                    <div className="space-y-2 border-t border-slate-800/50 pt-3">
                      <div className="flex items-center justify-between text-[11px] xs:text-xs sm:text-sm gap-2">
                        <label className="flex items-center space-x-2 cursor-pointer select-none min-w-0 shrink">
                          <input
                            type="checkbox"
                            checked={agreeThirdParty}
                            onChange={(e) => setAgreeThirdParty(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-kt-red focus:ring-0 focus:ring-offset-0 cursor-pointer accent-kt-red shrink-0"
                            disabled={loading}
                          />
                          <span className="font-bold text-slate-300 whitespace-nowrap">
                            개인정보 제3자 제공에 동의합니다. <span className="text-kt-red">(필수)</span>
                          </span>
                        </label>

                        <button
                          type="button"
                          onClick={() => setShowThirdPartyDetails(!showThirdPartyDetails)}
                          className="text-[11px] xs:text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center space-x-0.5 border border-transparent hover:border-red-400/10 rounded px-1 py-0.5 shrink-0"
                        >
                          <span className="whitespace-nowrap">자세히 보기</span>
                          {showThirdPartyDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>

                      {/* Third-Party Details Collapsible */}
                      <AnimatePresence>
                        {showThirdPartyDetails && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 sm:p-5 text-xs text-slate-400 space-y-4 font-medium leading-relaxed max-h-80 overflow-y-auto">
                              <div className="flex items-center text-slate-200 font-bold space-x-1 border-b border-slate-800 pb-2 mb-1">
                                <Info className="w-3.5 h-3.5 text-kt-red" />
                                <span className="text-sm font-bold font-display">개인정보 제3자 제공 동의</span>
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-slate-200 font-bold">1. 제3자 제공의 법적 근거 및 범위</h4>
                                <p className="text-slate-400 pl-3 leading-relaxed">
                                  (주)드림텔레콤(이하 “회사”)는 「개인정보 보호법」 제17조에 따라, 정보주체의 <strong>별도 동의</strong>가 있는 경우 또는 법령에 근거가 있는 경우에 한해 개인정보를 제3자에게 제공합니다. 회사는 제공 목적, 제공받는 자, 제공 항목, 보유·이용기간을 <strong>명확히 고지</strong>하며, 본 동의서와 개인정보처리방침의 제3자 제공 항목을 <strong>동일하게</strong> 관리합니다.
                                </p>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-slate-200 font-bold">2. 제공 내역(행 단위로 실명 기재)</h4>
                                <div className="overflow-x-auto">
                                  <table className="w-full border-collapse border border-slate-800 text-[11px] text-slate-300">
                                    <thead>
                                      <tr className="bg-slate-950 text-slate-400">
                                        <th className="border border-slate-800 p-2 text-left font-bold">제공받는 자(실명)</th>
                                        <th className="border border-slate-800 p-2 text-left font-bold">제공 목적</th>
                                        <th className="border border-slate-800 p-2 text-left font-bold">제공 항목</th>
                                        <th className="border border-slate-800 p-2 text-left font-bold">보유·이용기간(수령사 기준)</th>
                                        <th className="border border-slate-800 p-2 text-left font-bold">구분</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="border border-slate-800 p-2">드림텔레콤</td>
                                        <td className="border border-slate-800 p-2">상담 연결 및 고객응대</td>
                                        <td className="border border-slate-800 p-2">성명, 휴대전화번호</td>
                                        <td className="border border-slate-800 p-2">목적 달성 시 또는 1년</td>
                                        <td className="border border-slate-800 p-2 text-kt-red font-bold">필수</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-slate-200 font-bold">3. 동의 거부권 및 불이익</h4>
                                <p className="text-slate-400 pl-3 leading-relaxed">
                                  정보주체는 제3자 제공에 대한 동의를 거부할 권리가 있습니다. 다만, 동의를 거부할 경우 상담 연결이 제한될 수 있습니다.
                                </p>
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-slate-200 font-bold">4. 동의의 철회</h4>
                                <p className="text-slate-400 pl-3 leading-relaxed">
                                  정보주체는 언제든지 동의를 철회할 수 있습니다. 철회는 고객센터 등 안내된 연락처를 통해 신청하실 수 있으며, 회사는 지체 없이 조치합니다.
                                </p>
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-slate-200 font-bold">5. 고지</h4>
                                <p className="text-slate-400 pl-3 leading-relaxed">
                                  제공받는 자, 제공 목적, 제공 항목, 보유·이용기간 등에 변경이 있는 경우, 회사는 개인정보처리방침의 제3자 제공 항목 및 본 동의서를 통해 내용을 공지·반영합니다.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Error Box */}
                {errorMsg && (
                  <div className="flex items-center space-x-2 bg-red-950/40 text-red-400 border border-red-500/30 rounded-xl p-4 text-xs sm:text-sm font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full glow-btn py-4 sm:py-5 rounded-2xl bg-cta-orange disabled:bg-slate-800 text-white font-black text-base sm:text-lg tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  id="btn-submit-consultation"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>무료 상담 신청하기</span>
                    </>
                  )}
                </button>

                {/* Emergency Contact Line */}
                <div className="text-center text-xs sm:text-sm font-bold text-slate-300 pt-1 flex items-center justify-center space-x-2">
                  <span className="bg-kt-red/10 text-red-400 px-2.5 py-0.5 rounded-lg text-[11px] sm:text-xs font-black border border-red-500/10">긴급 설치 지원</span>
                  <a href="tel:010-2924-8009" className="text-white hover:text-kt-red transition-colors text-sm sm:text-base tracking-wide font-black">010-2924-8009</a>
                </div>

                {/* Under-button trust line */}
                <div className="flex items-center justify-center space-x-2 text-slate-500 text-[10px] sm:text-xs font-semibold pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>개인정보는 오직 상담용으로만 안전하게 암호화 처리되며, 마케팅용 스팸으로 활용되지 않습니다.</span>
                </div>

              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
                id="consultation-success-view"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white">상담 신청이 완료되었습니다!</h3>
                  <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    드림텔레콤 전문 상담 매니저가 연락처로 당일 신속하게 연락드려 최고 요금제와 사은품 매칭을 안내해 드리겠습니다.
                  </p>
                </div>

                {/* Step indicators of processing */}
                <div className="max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-kt-red bg-kt-red/10 px-2 py-0.5 rounded">STEP 01</span>
                    <div className="text-xs font-bold text-slate-200">신청서 수신 완료</div>
                    <p className="text-[10px] text-slate-500 font-medium">실시간 데이터베이스 안전 이관</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">STEP 02</span>
                    <div className="text-xs font-bold text-slate-200">담당자 1:1 즉시 배정</div>
                    <p className="text-[10px] text-slate-500 font-medium">최대 지원금 특허 산출 진행</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded">STEP 03</span>
                    <div className="text-xs font-bold text-slate-200">유선 연락 및 개통</div>
                    <p className="text-[10px] text-slate-500 font-medium">설치 직후 사은품 즉시 송금</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors"
                  >
                    추가 신청 또는 정보 새로고침
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
