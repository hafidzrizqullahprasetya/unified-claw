import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🧪 API Test Console
          </h1>
          <Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Backend Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Backend Status
          </h2>
          <div id="backend-status" className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </div>

        {/* Test API Calls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Check */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Health Check
            </h3>
            <button
              onClick={() => testHealthCheck()}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              GET /health
            </button>
            <div id="health-response" className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm" />
          </div>

          {/* Register */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Register User
            </h3>
            <input type="text" id="register-email" placeholder="Email" className="w-full px-3 py-2 border dark:bg-gray-700 dark:text-white rounded mb-2" />
            <input type="password" id="register-password" placeholder="Password" className="w-full px-3 py-2 border dark:bg-gray-700 dark:text-white rounded mb-2" />
            <input type="text" id="register-name" placeholder="Full Name" className="w-full px-3 py-2 border dark:bg-gray-700 dark:text-white rounded mb-2" />
            <button
              onClick={() => testRegister()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              POST /auth/register
            </button>
            <div id="register-response" className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm" />
          </div>

          {/* Login */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Login
            </h3>
            <input type="text" id="login-email" placeholder="Email" className="w-full px-3 py-2 border dark:bg-gray-700 dark:text-white rounded mb-2" />
            <input type="password" id="login-password" placeholder="Password" className="w-full px-3 py-2 border dark:bg-gray-700 dark:text-white rounded mb-2" />
            <button
              onClick={() => testLogin()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              POST /auth/login
            </button>
            <div id="login-response" className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm" />
          </div>

          {/* Create Store */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Create Store
            </h3>
            <input type="text" id="store-name" placeholder="Store Name" className="w-full px-3 py-2 border dark:bg-gray-700 dark:text-white rounded mb-2" />
            <input type="text" id="store-slug" placeholder="Store Slug" className="w-full px-3 py-2 border dark:bg-gray-700 dark:text-white rounded mb-2" />
            <button
              onClick={() => testCreateStore()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              POST /api/stores
            </button>
            <div id="store-response" className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm" />
          </div>
        </div>

        {/* Response Format */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📝 Tips
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Backend harus running: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1">npx tsx src/server-node.ts</code></li>
            <li>Gunakan email yang unik untuk setiap register</li>
            <li>Simpan token dari login untuk API calls yang memerlukan auth</li>
            <li>Response akan muncul di bawah setiap tombol</li>
          </ul>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        const BACKEND_URL = 'http://localhost:3000';
        let token = localStorage.getItem('auth_token');

        async function checkBackend() {
          try {
            const res = await fetch(BACKEND_URL + '/health');
            const data = await res.json();
            document.getElementById('backend-status').innerHTML = \`
              <div className="text-green-600">
                <p>✅ Backend Connected</p>
                <p>Status: \${data.status}</p>
                <p>Version: \${data.version}</p>
              </div>
            \`;
          } catch (error) {
            document.getElementById('backend-status').innerHTML = \`
              <div style="color: red;">
                <p>❌ Backend Error</p>
                <p>\${error.message}</p>
              </div>
            \`;
          }
        }

        async function testHealthCheck() {
          try {
            const res = await fetch(BACKEND_URL + '/health');
            const data = await res.json();
            document.getElementById('health-response').innerText = JSON.stringify(data, null, 2);
          } catch (error) {
            document.getElementById('health-response').innerText = '❌ ' + error.message;
          }
        }

        async function testRegister() {
          try {
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const full_name = document.getElementById('register-name').value;

            if (!email || !password || !full_name) {
              document.getElementById('register-response').innerText = '❌ Semua field harus diisi';
              return;
            }

            const res = await fetch(BACKEND_URL + '/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email,
                password,
                full_name,
                phone: '081234567890'
              })
            });
            const data = await res.json();
            if (data.token) {
              token = data.token;
              localStorage.setItem('auth_token', token);
              document.getElementById('register-response').innerText = '✅ Register berhasil\\nToken disimpan di localStorage\\n\\n' + JSON.stringify(data, null, 2);
            } else {
              document.getElementById('register-response').innerText = JSON.stringify(data, null, 2);
            }
          } catch (error) {
            document.getElementById('register-response').innerText = '❌ ' + error.message;
          }
        }

        async function testLogin() {
          try {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
              document.getElementById('login-response').innerText = '❌ Email dan password harus diisi';
              return;
            }

            const res = await fetch(BACKEND_URL + '/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.token) {
              token = data.token;
              localStorage.setItem('auth_token', token);
              document.getElementById('login-response').innerText = '✅ Login berhasil\\nToken disimpan\\n\\n' + JSON.stringify(data, null, 2);
            } else {
              document.getElementById('login-response').innerText = JSON.stringify(data, null, 2);
            }
          } catch (error) {
            document.getElementById('login-response').innerText = '❌ ' + error.message;
          }
        }

        async function testCreateStore() {
          try {
            if (!token) {
              document.getElementById('store-response').innerText = '❌ Login dulu untuk create store';
              return;
            }

            const name = document.getElementById('store-name').value;
            const slug = document.getElementById('store-slug').value;

            if (!name || !slug) {
              document.getElementById('store-response').innerText = '❌ Nama dan slug harus diisi';
              return;
            }

            const res = await fetch(BACKEND_URL + '/api/stores', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ name, slug, description: 'Test store' })
            });
            const data = await res.json();
            document.getElementById('store-response').innerText = JSON.stringify(data, null, 2);
          } catch (error) {
            document.getElementById('store-response').innerText = '❌ ' + error.message;
          }
        }

        checkBackend();
        setInterval(checkBackend, 5000);
      `}} />
    </div>
  );
}
