let queriesDesign= (fromDate,toDate) => {
            let allBatchJobs=`SELECT   SUBSTR (fcp.concurrent_program_name, 1, 20) concurrent_program_name,
                     fcp.concurrent_program_name AS "Concurrent Program",
                     COUNT (*) jobcount,
                     ROUND (SUM (((fcr.actual_completion_date - fcr.actual_start_date) * 86400))) totalrun,
                     ROUND (AVG (((fcr.actual_completion_date - fcr.actual_start_date) * 86400))) avgrun,
                     ROUND (AVG (((CASE
                        WHEN request_date  > requested_start_date
                           THEN (actual_start_date - request_date) *24*60*60
                        ELSE (actual_start_date - requested_start_date) *24*60*60
                     END ) ))) avgwait
                FROM applsys.fnd_concurrent_requests fcr, applsys.fnd_concurrent_programs fcp, apps.fnd_user fusr
               WHERE 1 = 1
                 AND fcr.program_application_id = fcp.application_id
                 AND fcr.concurrent_program_id = fcp.concurrent_program_id
                 AND fcr.actual_start_date >=
                                             TO_DATE ('${fromDate}', 'YYYY/MM/DD HH24:MI')
                 AND fcr.actual_start_date <= TO_DATE ('${toDate}', 'YYYY/MM/DD HH24:MI')
                 AND fcr.requested_by = fusr.user_id
            GROUP BY SUBSTR (fcp.concurrent_program_name, 1, 20),
                     fcp.concurrent_program_name
            ORDER BY fcp.concurrent_program_name`
            let loadBalance = `SELECT  f.concurrent_queue_name que_name,
                    f.Target_Node,
                    C.concurrent_program_name module,
                    count(1) num_execs,
                    round(sum(B.actual_completion_date - B.actual_start_date)*1440,2) tot_mins,
                    min(B.actual_start_date) min_start_date,
                    max(B.actual_completion_date) max_complete_date,
                    sum(A.LOGOFF_LREAD) lread,
                    sum(A.LOGOFF_PREAD) pread,
                    round(sum(A.SESSION_CPU/100)/60,2) cpu_mins,
                    round(sum(A.SESSION_CPU/100)/60 /count(1),2) cpu_per_exec,
                    round((sum(A.SESSION_CPU/100)/60)/(sum(B.actual_completion_date - B.actual_start_date)*1440),1) cpusec_per_sec
              FROM  dba_audit_session               A,
                    apps.fnd_concurrent_requests    B,
                    apps.fnd_concurrent_programs_vl C,
                    apps.FND_CONCURRENT_PROCESSES   E,
                    apps.FND_CONCURRENT_QUEUES      F
             WHERE A.logoff_time BETWEEN TO_DATE ('${fromDate}','YYYY/MM/DD HH24:MI')
                                     AND TO_DATE ('${toDate}',  'YYYY/MM/DD HH24:MI')
               AND A.SESSIONID =  B.oracle_session_id
               AND B.concurrent_program_id = C.concurrent_program_id
               AND E.queue_application_id =  F.application_id
               AND E.concurrent_queue_id =   F.concurrent_queue_id
               AND B.CONTROLLING_MANAGER =   E.CONCURRENT_PROCESS_ID
            GROUP BY F.CONCURRENT_QUEUE_NAME, C.CONCURRENT_PROGRAM_NAME ,F.TARGET_NODE
            HAVING   SUM(A.SESSION_CPU/100) > 5
            ORDER BY 1,7,3`
            return{
                allBatchJobs,
                loadBalance
              }
}
module.exports= queriesDesign;
