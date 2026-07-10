export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  productType: string;
  status: 'pending' | 'contacting' | 'completed' | 'cancelled';
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
  notes?: string;
  thirdPartyAgree?: boolean;
  attachedFiles?: { name: string; size: number }[];
}

export interface CustomerReview {
  id: string;
  rating: number;
  content: string;
  author: string;
}
