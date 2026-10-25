const SUPABASE_URL = 'https://ysuzcsyvpuebxywjsxdg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_AA_UQ8l8-nV2gH-MPDc7aQ_l9k9Dgww';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
  };
};

export const apiEcommerce = {
  // --- AUTENTICACIÓN (Simulada para mantener tu AuthBox intacto localmente) ---
  async login(credentials: { email: string; password: string }) {
    // Para la entrega puedes simular un login exitoso local
    return {
      token: 'supabase_mock_token',
      user: { id: 1, name: 'Administrador Supabase', email: credentials.email }
    };
  },

  // --- CATÁLOGO DE PRODUCTOS DESDE SUPABASE ---
  async getProducts() {
    // Al añadir ?select=* Supabase te devuelve todas las filas en formato JSON de inmediato
    const res = await fetch(`${SUPABASE_URL}/products?select=*`, { 
      method: 'GET', 
      headers: getHeaders() 
    });
    if (!res.ok) throw new Error('Error al obtener productos desde Supabase');
    return res.json();
  },

  async createProduct(productData: { name: string; description: string; price: number }) {
    const res = await fetch(`${SUPABASE_URL}/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Error al crear producto en la nube');
    return { success: true };
  },

  async updateProduct(id: string, productData: Partial<{ name: string; description: string; price: number }>) {
    // Supabase filtra usando parámetros en la URL (ej. ?id=eq.5)
    const res = await fetch(`${SUPABASE_URL}/products?id=eq.${id}`, {
      method: 'PATCH', // Supabase prefiere PATCH para actualizaciones parciales
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Error al editar producto en la nube');
    return { success: true };
  },

  async deleteProduct(id: string) {
    const res = await fetch(`${SUPABASE_URL}/products?id=eq.${id}`, { 
      method: 'DELETE', 
      headers: getHeaders() 
    });
    if (!res.ok) throw new Error('Error al eliminar producto en la nube');
    return { success: true };
  },

  // --- PASARELA DE PAGOS ---
  async checkout(cartItems: any[]) {
    alert('Simulación de pago completada con los productos en línea.');
    return { success: true };
  }
};
