import { defineConfig } from 'vite'
import mkCert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [react(), mkCert()],
});
