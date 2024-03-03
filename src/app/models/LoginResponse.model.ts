export interface LoginResponse {
  estado: string;
  mensaje: string;
  objeto: UsuarioCapi;
  token: string;
}

export interface UsuarioCapi {
  correo?: string;
  nombre?: string;
  rol_id?: number;
}
