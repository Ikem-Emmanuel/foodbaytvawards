export interface DeviceLog {
    id?: string;
    device_id: string;
    battery_level?: string;
    card_rfid?: string;
    last_log?:any;
    name?: string;
    port?: string;
    ip_address?: string;
    created_at?: Date,
    updated_at?: Date,
    device_status?: string;
    flag?: string;
    gps_status?: number;
    latitude?: string;
    longitude?: string;
    lock_status?: string;
    log_id?: number;
    report_date?: Date;
    report_reason?: string;
    seal?: number;
    tamper_status?: number;
    latlong?: string;
}