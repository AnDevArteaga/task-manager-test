import { CheckCircle, Folder, ListTodo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/primary-layout';
import { IndicatorCard } from '../components/common/indicators-card';
import { useTaskStats } from '../hooks/tasks/useGetAllTask';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { completed, pending, loading } = useTaskStats();
  return (
    <Layout title="Taskly | Dashboard">  
    
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-background-dark dark:text-white">
      <section className="mb-6">
        <h1 className="text-xl font-medium text-gray-800 dark:text-white">Hola, Usuario 👋</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">Panel de gestión de tareas</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => navigate("/projects")}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
          role="button"
          aria-label="Ir a proyectos"
       >
          <div className="flex items-center mb-2">
            <Folder size={18} />
            <h2 className="ml-2 font-medium">Proyectos</h2>
          </div>
          <p className="text-xs opacity-80">Ver proyectos activos</p>
        </div>

      <IndicatorCard
        title="Tareas completadas"
        value={loading ? "..." : completed.toString()}
        icon={<CheckCircle size={18} />}
      />
      <IndicatorCard
        title="Pendientes"
        value={loading ? "..." : pending.toString()}
        icon={<ListTodo size={18} />}
      />
      </section>
        <section className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200 dark:bg-gray-900 dark:border-gray-900">
          <h2 className="text-SM font-semibold mb-4 text-gray-800 dark:text-white">TASKLY</h2>
          <p className="text-gray-700 leading-relaxed text-xs dark:text-white">
            Taskly es una aplicación moderna para gestionar tus proyectos y tareas de forma eficiente y sencilla.  
            Con Taskly puedes crear proyectos, asignar tareas con prioridad, fechas límite y llevar un control del avance.  
            Diseñada para mejorar tu productividad y organización personal o de equipos.
          </p>
        </section>
    </div>
        </Layout>

  );
}

