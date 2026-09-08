/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

export type ConcernCategory =
  | 'CLEANLINESS'
  | 'TEMPLE_FACILITIES'
  | 'WATER_SUPPLY'
  | 'LIGHTING'
  | 'PARKING'
  | 'CROWD_MANAGEMENT'
  | 'ROAD_ACCESS'
  | 'SAFETY'
  | 'MAINTENANCE'
  | 'ACCESSIBILITY'
  | 'LAKE_ENVIRONMENT'
  | 'OTHER';

export type ConcernStatus =
  | 'SUBMITTED'
  | 'ACKNOWLEDGED'
  | 'IN_REVIEW'
  | 'ACTION_REQUIRED'
  | 'RESOLVED'
  | 'CLOSED';

export interface TempleConcernRecord {
  concernId: string;
  category: ConcernCategory;
  title: string;
  description: string;
  locationArea: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  photoUrl?: string;
  submittedByName: string;
  submittedByPhone: string;
  submittedByEmail?: string;
  status: ConcernStatus;
  adminNotes?: string;
  resolutionSummary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityIdeaRecord {
  ideaId: string;
  title: string;
  description: string;
  category: 'VILLAGE_GREENERY' | 'PILGRIM_COMFORT' | 'CULTURAL_HERITAGE' | 'YOUTH_EDUCATION' | 'LAKE_REVIVAL' | 'COMMERCE_SUPPORT';
  submittedByName: string;
  submittedByContact: string;
  votesCount: number;
  status: 'PROPOSED' | 'UNDER_REVIEW' | 'ACCEPTED' | 'IMPLEMENTED';
  adminFeedback?: string;
  createdAt: string;
}

export interface VolunteerOpportunity {
  opportunityId: string;
  title: string;
  description: string;
  team: 'ANNADHANAM' | 'FESTIVAL_CROWD' | 'CLEANLINESS' | 'TEMPLE_GARDEN' | 'FIRST_AID' | 'GUIDE_SERVICE';
  frequency: 'WEEKEND' | 'FESTIVAL_TIME' | 'DAILY' | 'ON_CALL';
  requirements: string[];
  contactPerson: string;
  contactPhone: string;
  openings: number;
  registeredCount: number;
}
