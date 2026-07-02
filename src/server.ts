interface CreateJobRequest {
    type:JobType;
    priority?: Priority;
    payload: unknown;
    runAt?: Date;
}
enum Priority {
  CRITICAL,
  HIGH,
  MEDIUM,
  LOW,
}

enum JobType {
  SEND_EMAIL,
  GENERATE_PDF,
  RESIZE_IMAGE,
  TRANSCODE_VIDEO,
  CALL_WEBHOOK,
  SEND_NOTIFICATION,
  PROCESS_PAYMENT,
  GENERATE_REPORT,
}
