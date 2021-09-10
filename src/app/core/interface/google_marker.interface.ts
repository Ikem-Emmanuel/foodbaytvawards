export interface Marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
	status: string;
	battery_level: string;
	device_id: string;
	device_name: string;
}