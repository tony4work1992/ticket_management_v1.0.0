import React, { useState } from 'react';
import {
  MoreHorizontal,
  ChevronDown,
  FileText,
  Map,
  Code,
  Globe,
  Database,
  Ticket,
  Target,
  ListChecks,
  FileCheck,
  ListOrdered,
  Hash,
  Tag,
  User,
  CheckCircle,
  PlayCircle,
  Calendar,
  Clock,
  AlertCircle,
  Settings,
  Edit,
  Trash2,
  Eye,
  Copy,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Artifact, ArtifactType, ApprovalStatus, ImplementationStatus, Priority } from '../types';

interface ArtifactTableProps {
  data: Artifact[];
}

const getArtifactIcon = (type: ArtifactType) => {
  switch (type) {
    case 'Business Requirement':
      return <FileText className="w-4 h-4 text-green-700" />;
    case 'Implementation Plan':
      return <Map className="w-4 h-4 text-purple-700" />;
    case 'Implementation Function':
      return <Code className="w-4 h-4 text-blue-700" />;
    case 'Endpoint':
      return <Globe className="w-4 h-4 text-blue-600" />;
    case 'Database Table':
      return <Database className="w-4 h-4 text-yellow-600" />;
    case 'Testing Ticket':
      return <Ticket className="w-4 h-4 text-red-600" />;
    case 'Scope':
      return <Target className="w-4 h-4 text-teal-600" />;
    case 'Checklist':
      return <ListChecks className="w-4 h-4 text-red-500" />;
    case 'Test Case':
      return <FileCheck className="w-4 h-4 text-orange-600" />;
    case 'Test Step':
      return <ListOrdered className="w-4 h-4 text-blue-500" />;
    default:
      return <FileText className="w-4 h-4 text-gray-500" />;
  }
};

const getCodeColor = (code: string) => {
  // Root
  if (code.startsWith('BRD')) return 'text-slate-900 font-bold';
  
  // Implementation Family (Blue)
  if (code.startsWith('IMP')) return 'text-blue-800 font-bold';
  if (code.startsWith('FUN')) return 'text-blue-600 font-bold';
  if (code.startsWith('END')) return 'text-blue-500 font-bold';
  if (code.startsWith('ENT')) return 'text-blue-500 font-bold';
  
  // Testing Family (Teal/Emerald)
  if (code.startsWith('TES')) return 'text-teal-800 font-bold';
  if (code.startsWith('SCO')) return 'text-teal-600 font-bold';
  if (code.startsWith('CHE')) return 'text-teal-600 font-bold';
  if (code.startsWith('CAS')) return 'text-teal-600 font-bold';
  if (code.startsWith('STE')) return 'text-teal-500 font-bold';
  
  return 'text-gray-800 font-bold';
};

const getTypeStyles = (type: ArtifactType) => {
  switch (type) {
    case 'Business Requirement':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Implementation Plan':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Implementation Function':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Endpoint':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Database Table':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Testing Ticket':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Scope':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'Checklist':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Test Case':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Test Step':
      return 'bg-red-50 text-red-800 border-red-100';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getApprovalStyles = (status: ApprovalStatus) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'REJECTED':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getImplementationStyles = (status: ImplementationStatus) => {
  switch (status) {
    case 'In Progress':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Done':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Not Started':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getPriorityStyles = (priority?: Priority) => {
  switch (priority) {
    case 'High':
      return 'text-red-600 font-medium';
    case 'Medium':
      return 'text-orange-600 font-medium';
    case 'Low':
      return 'text-green-600 font-medium';
    default:
      return 'text-gray-600';
  }
};

export const ArtifactTable: React.FC<ArtifactTableProps> = ({ data }) => {
  const [selectedRow, setSelectedRow] = useState<{ id: string; top: number } | null>(null);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const handleRowClick = (id: string, event: React.MouseEvent<HTMLTableRowElement>) => {
    if (selectedRow?.id === id) {
      setSelectedRow(null);
    } else {
      if (tableContainerRef.current) {
        const containerRect = tableContainerRef.current.getBoundingClientRect();
        const rowRect = event.currentTarget.getBoundingClientRect();
        const relativeTop = rowRect.top - containerRect.top;
        
        setSelectedRow({
          id,
          top: relativeTop
        });
      }
    }
  };

  const renderConnectors = (item: Artifact, index: number, allItems: Artifact[]) => {
    // ... (keep existing renderConnectors logic)
    const level = item.level || 0;
    if (level === 0) return null;

    const connectors = [];
    for (let k = 0; k < level; k++) {
      let hasNextSibling = false;
      for (let j = index + 1; j < allItems.length; j++) {
        const nextItem = allItems[j];
        const nextLevel = nextItem.level || 0;
        if (nextLevel <= k + 1) {
          if (nextLevel === k + 1) {
            hasNextSibling = true;
          }
          break;
        }
      }

      const isLastLevel = k === level - 1;
      
      connectors.push(
        <div key={k} className="w-6 h-full flex items-center justify-center shrink-0 relative">
          {/* Vertical line for passing through */}
          {!isLastLevel && hasNextSibling && (
            <div className="absolute top-0 bottom-0 w-px bg-gray-300 left-1/2 -translate-x-1/2"></div>
          )}
          
          {/* Corner (L) */}
          {isLastLevel && !hasNextSibling && (
            <>
              <div className="absolute top-0 h-1/2 w-px bg-gray-300 left-1/2 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 right-0 h-px bg-gray-300"></div>
            </>
          )}

          {/* Tee (├) */}
          {isLastLevel && hasNextSibling && (
            <>
              <div className="absolute top-0 bottom-0 w-px bg-gray-300 left-1/2 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 right-0 h-px bg-gray-300"></div>
            </>
          )}
        </div>
      );
    }
    return <div className="flex h-full mr-2">{connectors}</div>;
  };

  return (
    <div className="relative w-full" ref={tableContainerRef}>
      <div className="w-full overflow-x-auto bg-white shadow-sm pb-20"> {/* Added padding-bottom for the bubble */}
        <table className="w-full min-w-[1600px] border-collapse text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_200%] animate-gradient-x backdrop-blur-md text-white uppercase text-xs tracking-wider shadow-sm">
              {/* ... (keep existing headers) */}
              <th className="p-3 text-center w-12 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1">
                  <Hash className="w-4 h-4 opacity-80" />
                  <span>NO</span>
                </div>
              </th>
              <th className="p-3 text-center w-32 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1">
                  <Code className="w-4 h-4 opacity-80" />
                  <span>CODE</span>
                </div>
              </th>
              <th className="p-3 text-left border-r border-white/20 font-semibold">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 opacity-80" />
                  <span>NAME</span>
                </div>
              </th>
              <th className="p-3 text-center w-48 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1">
                  <Tag className="w-4 h-4 opacity-80" />
                  <span>Type</span>
                </div>
              </th>
              <th className="p-3 text-center w-40 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1">
                  <User className="w-4 h-4 opacity-80" />
                  <span>Assignee</span>
                </div>
              </th>
              <th className="p-3 text-center w-32 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1 leading-tight">
                  <CheckCircle className="w-4 h-4 opacity-80" />
                  <span>APPROVAL</span>
                  <span>STATUS</span>
                </div>
              </th>
              <th className="p-3 text-center w-36 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1 leading-tight">
                  <PlayCircle className="w-4 h-4 opacity-80" />
                  <span>IMPLEMENTATION</span>
                  <span>STATUS</span>
                </div>
              </th>
              <th className="p-3 text-center w-28 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1">
                  <Calendar className="w-4 h-4 opacity-80" />
                  <span>Start Date</span>
                </div>
              </th>
              <th className="p-3 text-center w-28 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1">
                  <Calendar className="w-4 h-4 opacity-80" />
                  <span>Due Date</span>
                </div>
              </th>
              <th className="p-3 text-center w-24 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1">
                  <Clock className="w-4 h-4 opacity-80" />
                  <span>Est. (h)</span>
                </div>
              </th>
              <th className="p-3 text-center w-24 border-r border-white/20 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1">
                  <AlertCircle className="w-4 h-4 opacity-80" />
                  <span>Priority</span>
                </div>
              </th>
              <th className="p-3 text-center w-16 font-semibold">
                <div className="flex flex-col items-center justify-center gap-1">
                  <Settings className="w-4 h-4 opacity-80" />
                  <span>Action</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const isSelected = selectedRow?.id === item.id;
              return (
                <motion.tr
                  key={item.id}
                  layout
                  onClick={(e) => handleRowClick(item.id, e)}
                  initial={false}
                  animate={{
                    backgroundColor: isSelected 
                      ? 'rgba(37, 99, 235, 0.1)' 
                      : index % 2 === 0 ? '#ffffff' : 'rgba(249, 250, 251, 0.5)',
                    boxShadow: isSelected ? "inset 4px 0 0 0 #2563eb" : "inset 0 0 0 0 transparent"
                  }}
                  whileHover={{
                    backgroundColor: isSelected 
                      ? 'rgba(37, 99, 235, 0.15)' 
                      : 'rgba(243, 244, 246, 1)',
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-200 cursor-pointer"
                >
                  <td className="p-2 text-center text-gray-600 font-medium">{item.no}</td>
                  <td className={`p-2 text-center ${getCodeColor(item.code)}`}>{item.code}</td>
                  <td className="p-0 text-gray-900 font-medium relative">
                    <div className="flex items-center h-full min-h-[40px]">
                      {renderConnectors(item, index, data)}
                      <span className="mr-2 flex-shrink-0">{getArtifactIcon(item.type)}</span>
                      <span className="py-2 pr-2 truncate">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-full px-2 py-1 rounded-full border text-xs font-medium ${getTypeStyles(
                        item.type
                      )}`}
                    >
                      <span className="truncate">{item.type}</span>
                    </div>
                  </td>
                  <td className="p-2 text-center text-gray-700">{item.assignee}</td>
                  <td className="p-2 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-full px-2 py-1 rounded-full border text-xs font-medium ${getApprovalStyles(
                        item.approvalStatus
                      )}`}
                    >
                      <span>{item.approvalStatus}</span>
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-full px-2 py-1 rounded-full border text-xs font-medium ${getImplementationStyles(
                        item.implementationStatus
                      )}`}
                    >
                      <span>{item.implementationStatus}</span>
                    </div>
                  </td>
                  <td className="p-2 text-center text-gray-600">{item.startDate || '-'}</td>
                  <td className="p-2 text-center text-gray-600">{item.dueDate || '-'}</td>
                  <td className="p-2 text-center text-gray-600 font-mono">{item.estimation || '-'}</td>
                  <td className={`p-2 text-center ${getPriorityStyles(item.priority)}`}>{item.priority || '-'}</td>
                  <td className="p-2 text-center">
                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedRow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
            style={{
              position: 'absolute',
              top: selectedRow.top - 12, // Position slightly above the row
              left: '50%',
              transform: 'translate(-50%, -100%)', // Move up by 100% of its own height
              zIndex: 50
            }}
            className="origin-bottom"
          >
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_200%] animate-gradient-x backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-6 -translate-y-full">
              <button className="flex flex-col items-center gap-1 hover:text-gray-200 transition-colors">
                <Eye className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">View</span>
              </button>
              <div className="w-px h-8 bg-white/20"></div>
              <button className="flex flex-col items-center gap-1 hover:text-gray-200 transition-colors">
                <Edit className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Edit</span>
              </button>
              <div className="w-px h-8 bg-white/20"></div>
              <button className="flex flex-col items-center gap-1 hover:text-gray-200 transition-colors">
                <Copy className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Clone</span>
              </button>
              <div className="w-px h-8 bg-white/20"></div>
              <button className="flex flex-col items-center gap-1 hover:text-red-300 transition-colors text-red-200">
                <Trash2 className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Delete</span>
              </button>
              <div className="w-px h-8 bg-white/20"></div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRow(null);
                }}
                className="flex flex-col items-center gap-1 hover:text-gray-200 transition-colors ml-2"
              >
                <X className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Close</span>
              </button>
            </div>
            {/* Arrow pointing down - using rotated div for gradient continuity */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 -translate-y-full w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 animate-gradient-x rotate-45 transform origin-center -z-10"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
