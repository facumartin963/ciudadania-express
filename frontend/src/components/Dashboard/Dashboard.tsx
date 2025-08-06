import React from 'react';
import { User, Trophy, Target, Flame, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import StatsCard from './StatsCard';
import ProgressMap from './ProgressMap';
import PremiumBanner from './PremiumBanner';

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { isPremium } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Hola, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Tu camino hacia la nacionalidad española continúa
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<Target className="w-6 h-6" />}
            title="Tests Realizados"
            value={user.stats.totalTests}
            color="blue"
          />
          <StatsCard
            icon={<Trophy className="w-6 h-6" />}
            title="Aciertos"
            value={`${Math.round((user.stats.correctAnswers / (user.stats.totalTests * 25)) * 100)}%`}
            color="green"
          />
          <StatsCard
            icon={<Flame className="w-6 h-6" />}
            title="Racha Actual"
            value={user.stats.currentStreak}
            color="orange"
          />
          <StatsCard
            icon={<User className="w-6 h-6" />}
            title="Puntos"
            value={user.stats.points}
            color="purple"
          />
        </div>

        {/* Premium Banner o Próximo Reto */}
        {!isPremium ? (
          <PremiumBanner />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Próximo Reto
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">
                  Test de Historia de España - Nivel Intermedio
                </p>
                <p className="text-sm text-gray-500">
                  25 preguntas • Tiempo estimado: 15 minutos
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Empezar Test
              </button>
            </div>
          </div>
        )}

        {/* Mapa de Progreso */}
        <ProgressMap isPremium={isPremium} progress={user.progress} />
      </div>
    </div>
  );
};

export default Dashboard;