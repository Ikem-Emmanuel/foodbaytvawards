import {Center } from './center.interface';
import { DeviceLog} from './device.status.interface';

export interface Device {
    id?: string;
    device_id: string;
    battery_level?: string;
    center?: Center,
    last_log?: DeviceLog;
    name: string;
    port?: string;
    ip_address?: string;
    created_at?: Date,
    updated_at?: Date,

}