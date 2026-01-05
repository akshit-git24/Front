// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { 
//   Loader2, 
//   RefreshCw, 
//   AlertTriangle, 
//   CheckCircle, 
//   XCircle,
//   Database,
//   Activity,
//   Users,
//   Clock
// } from 'lucide-react';

// interface QueueStats {
//   priority_queue_length: number;
//   normal_queue_length: number;
//   dlq_length: number;
//   total_pending: number;
// }

// interface DLQItem {
//   job_id: string;
//   status: string;
//   attempts: number;
//   reason?: string;
//   error?: string;
//   created_at: string;
//   student_ids: number[];
//   room_id: number;
// }

// interface ReconciliationItem {
//   room_id: number;
//   room_number: string;
//   db_assignments: number;
//   redis_available: number;
//   expected_available: number;
//   consistent: boolean;
// }

// const AdminMonitoring: React.FC = () => {
//   const [queueStats, setQueueStats] = useState<QueueStats | null>(null);
//   const [dlqItems, setDlqItems] = useState<DLQItem[]>([]);
//   const [reconciliationData, setReconciliationData] = useState<ReconciliationItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchQueueStats();
//     fetchDLQItems();
//     fetchReconciliationData();
//   }, []);

//   const fetchQueueStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/admin/monitoring/queue-stats', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setQueueStats(data);
//       } else {
//         setError('Failed to fetch queue stats');
//       }
//     } catch (err) {
//       setError('Error fetching queue stats');
//     }
//   };

//   const fetchDLQItems = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/admin/monitoring/dlq-items', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setDlqItems(data);
//       }
//     } catch (err) {
//       console.error('Error fetching DLQ items:', err);
//     }
//   };

//   const fetchReconciliationData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/admin/monitoring/reconciliation', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setReconciliationData(data);
//       }
//     } catch (err) {
//       console.error('Error fetching reconciliation data:', err);
//     }
//   };

//   const requeueDLQItem = async (jobId: string) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/admin/monitoring/requeue-dlq/${jobId}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         await fetchDLQItems();
//         await fetchQueueStats();
//       } else {
//         setError('Failed to requeue job');
//       }
//     } catch (err) {
//       setError('Error requeuing job');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reconcileAllRooms = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/admin/monitoring/reconcile-all', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         await fetchReconciliationData();
//       } else {
//         setError('Failed to reconcile rooms');
//       }
//     } catch (err) {
//       setError('Error reconciling rooms');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearDLQ = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/admin/monitoring/clear-dlq', {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         await fetchDLQItems();
//         await fetchQueueStats();
//       } else {
//         setError('Failed to clear DLQ');
//       }
//     } catch (err) {
//       setError('Error clearing DLQ');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshAll = async () => {
//     setLoading(true);
//     await Promise.all([
//       fetchQueueStats(),
//       fetchDLQItems(),
//       fetchReconciliationData()
//     ]);
//     setLoading(false);
//   };

//   const inconsistentRooms = reconciliationData.filter(room => !room.consistent);
//   const totalInconsistent = inconsistentRooms.length;

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">System Monitoring</h1>
//         <div className="flex gap-2">
//           <Button onClick={refreshAll} disabled={loading} variant="outline">
//             <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
//             Refresh All
//           </Button>
//         </div>
//       </div>

//       {error && (
//         <Alert variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {/* Queue Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Priority Queue</CardTitle>
//             <Activity className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {queueStats?.priority_queue_length || 0}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               High priority jobs
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Normal Queue</CardTitle>
//             <Clock className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {queueStats?.normal_queue_length || 0}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               Regular jobs
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Dead Letter Queue</CardTitle>
//             <XCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {queueStats?.dlq_length || 0}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               Failed jobs
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {queueStats?.total_pending || 0}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               All pending jobs
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Data Consistency */}
//       <Card>
//         <CardHeader>
//           <div className="flex justify-between items-center">
//             <CardTitle className="flex items-center gap-2">
//               <Database className="h-5 w-5" />
//               Data Consistency
//             </CardTitle>
//             <div className="flex gap-2">
//               <Button onClick={reconcileAllRooms} disabled={loading} variant="outline">
//                 <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
//                 Reconcile All
//               </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {totalInconsistent > 0 ? (
//             <Alert variant="destructive">
//               <AlertTriangle className="h-4 w-4" />
//               <AlertDescription>
//                 {totalInconsistent} rooms have inconsistent data between Redis and PostgreSQL
//               </AlertDescription>
//             </Alert>
//           ) : (
//             <Alert>
//               <CheckCircle className="h-4 w-4" />
//               <AlertDescription>
//                 All room data is consistent between Redis and PostgreSQL
//               </AlertDescription>
//             </Alert>
//           )}

//           <div className="mt-4 space-y-2">
//             {inconsistentRooms.map((room) => (
//               <div key={room.room_id} className="flex items-center justify-between p-3 border rounded-lg">
//                 <div>
//                   <p className="font-medium">Room {room.room_number}</p>
//                   <p className="text-sm text-gray-600">
//                     DB: {room.db_assignments} | Redis: {room.redis_available} | Expected: {room.expected_available}
//                   </p>
//                 </div>
//                 <Badge variant="destructive">Inconsistent</Badge>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Dead Letter Queue */}
//       <Card>
//         <CardHeader>
//           <div className="flex justify-between items-center">
//             <CardTitle>Dead Letter Queue</CardTitle>
//             <div className="flex gap-2">
//               <Button onClick={clearDLQ} disabled={loading} variant="destructive" size="sm">
//                 Clear DLQ
//               </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {dlqItems.length === 0 ? (
//             <p className="text-gray-500">No items in Dead Letter Queue</p>
//           ) : (
//             <div className="space-y-3">
//               {dlqItems.map((item) => (
//                 <div key={item.job_id} className="border rounded-lg p-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="font-medium">Job {item.job_id}</p>
//                       <p className="text-sm text-gray-600">
//                         Room ID: {item.room_id} | Students: {item.student_ids.join(', ')}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Attempts: {item.attempts} | Created: {new Date(item.created_at).toLocaleString()}
//                       </p>
//                       {item.reason && (
//                         <p className="text-sm text-red-600">Reason: {item.reason}</p>
//                       )}
//                       {item.error && (
//                         <p className="text-sm text-red-600">Error: {item.error}</p>
//                       )}
//                     </div>
//                     <div className="flex gap-2">
//                       <Button
//                         onClick={() => requeueDLQItem(item.job_id)}
//                         disabled={loading}
//                         size="sm"
//                         variant="outline"
//                       >
//                         Requeue
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminMonitoring;
