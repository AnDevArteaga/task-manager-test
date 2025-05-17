// NotFound

import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50 dark:bg-gray-900">
      <AlertTriangle className="text-red-500 dark:text-red-400 mb-4" size={48} />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Página no encontrada</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        La ruta que intentaste visitar no existe.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
