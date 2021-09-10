export interface Verification_history {
  key: string;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: Verification_history[];
  parent?: Verification_history;
}
