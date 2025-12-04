import React, { useState } from 'react';
import Header from '../../components/ui/Header'; 
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

// Configurações da API
const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const AppointmentHistory = () => {
  // 1. Estado dos Filtros
  const [filters, setFilters] = useState({
    startDate: new Date().toISOString().split('T')[0], // Hoje
    endDate: new Date().toISOString().split('T')[0],   // Hoje
    strategy: 'indexada' // Padrão: Indexada (Rápida)
  });

  // 2. Estado dos Resultados
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Função de Busca (Consumindo o Backend .NET)
  const handleSearch = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Monta o body conforme o DTO do Backend (PerformanceRequest)
      const payload = {
        dataInicio: filters.startDate + "T00:00:00",
        dataFim: filters.endDate + "T23:59:59",
        estrategia: filters.strategy
      };

      const response = await fetch(`${API_URL}/consultas/teste-performance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': API_TOKEN
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar dados. Verifique sua conexão ou token.');
      }

      const data = await response.json();
      setResults(data); // { tempoExecucaoMs, totalRegistrosEncontrados, amostraDados: [] }

    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Auxiliar para cor do status
  const getStatusColor = (status) => {
    const map = {
      'Agendada': 'bg-blue-100 text-blue-800',
      'Concluída': 'bg-green-100 text-green-800',
      'Cancelada': 'bg-red-100 text-red-800',
      'No-Show': 'bg-gray-100 text-gray-800'
    };
    return map[status] || 'bg-gray-100 text-gray-800';
  };

   // Função para converter milissegundos em segundos
  const formatTimeSeconds = (ms) => {
    if (ms === undefined || ms === null) return '0 s';
    // Divide por 1000 e fixa em 4 casas decimais para precisão
    return `${(ms / 1000).toFixed(4)} s`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Histórico de Consultas
            </h1>
            <p className="text-gray-500">
              Pesquise consultas realizadas ou agendadas por período.
            </p>
          </div>

          {/* --- ÁREA DE FILTROS --- */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              
              <Input
                label="Data Inicial"
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Data Final"
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleInputChange}
                required
              />

              {/* Seletor de Estratégia (Recurso Educativo) */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Modo de Pesquisa</label>
                <select
                  name="strategy"
                  value={filters.strategy}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="indexada">⚡ Rápida (Indexada)</option>
                  <option value="sequencial">🐢 Lenta (Sequencial)</option>
                  <option value="hash">⚙️ Hash Join</option>
                </select>
              </div>

              <Button
                type="submit"
                variant="default"
                loading={loading}
                iconName="Search"
                fullWidth
              >
                Buscar Consultas
              </Button>
            </form>
          </div>

          {/* --- MENSAGEM DE ERRO --- */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
              <Icon name="AlertTriangle" />
              {error}
            </div>
          )}

          {/* --- RESULTADOS --- */}
          {results && (
            <div className="space-y-6">
              
              {/* Cards de Resumo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Encontrado</p>
                    <p className="text-2xl font-bold text-gray-900">{results.totalRegistrosEncontrados}</p>
                  </div>
                  <Icon name="List" className="text-blue-500" size={24} />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tempo de Execução (Backend)</p>
                    <p className={`text-2xl font-bold ${results.tempoExecucaoMs > 500 ? 'text-red-600' : 'text-green-600'}`}>
                       {formatTimeSeconds(results.tempoExecucaoMs)}
                    </p>
                  </div>
                  <Icon name="Clock" className="text-gray-400" size={24} />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Estratégia Utilizada</p>
                    <p className="text-lg font-bold text-gray-900 capitalize">{results.estrategiaUsada}</p>
                  </div>
                  <Icon name="Activity" className="text-purple-500" size={24} />
                </div>
              </div>

              {/* Tabela de Dados */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Médico</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.amostraDados && results.amostraDados.length > 0 ? (
                        results.amostraDados.map((consulta) => (
                          <tr key={consulta.consultaID} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(consulta.dataConsulta).toLocaleDateString()} <span className="text-gray-400 text-xs">{new Date(consulta.dataConsulta).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {consulta.nomePaciente}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {consulta.nomeDoutor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {consulta.especialidade || 'Clínico Geral'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(consulta.status)}`}>
                                {consulta.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                            Nenhuma consulta encontrada neste período.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Nota de rodapé se houver muitos dados */}
                {results.totalRegistrosEncontrados > 50 && (
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center">
                    Exibindo apenas os primeiros 50 registros de {results.totalRegistrosEncontrados} encontrados.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AppointmentHistory;