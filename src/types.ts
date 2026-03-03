export type ArtifactType =
  | 'Business Requirement'
  | 'Implementation Plan'
  | 'Implementation Function'
  | 'Endpoint'
  | 'Database Table'
  | 'Testing Ticket'
  | 'Scope'
  | 'Checklist'
  | 'Test Case'
  | 'Test Step';

export type ApprovalStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

export type ImplementationStatus = 'In Progress' | 'Done' | 'Not Started';

export type Priority = 'High' | 'Medium' | 'Low';

export interface Artifact {
  id: string;
  no: string;
  code: string;
  name: string;
  type: ArtifactType;
  assignee: string;
  approvalStatus: ApprovalStatus;
  implementationStatus: ImplementationStatus;
  level?: number;
  startDate?: string;
  dueDate?: string;
  estimation?: number; // in hours
  priority?: Priority;
}
