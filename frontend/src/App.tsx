import { useEffect, useState } from 'react';
import './App.css';

interface Employee {
  id: number;
  fullName: string;
  role: string;
  isActive: boolean;
}

function App() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  // Estado para el buscador
  const [searchTerm, setSearchTerm] = useState('');

  // Estado del formulario
  const [formData, setFormData] = useState({ fullName: '', role: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [loading, setLoading] = useState(false);
  const API_URL = 'http://localhost:3000/employees';

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEmployees(data);
    } catch (error) { console.error('Error:', error); }
  };

  // --- NUEVO: Cambiar estado (Activo/Inactivo) rápidamente ---
  const handleToggleStatus = async (employee: Employee) => {
    try {
      // Optimistic update (actualizamos la UI visualmente primero para que se sienta rápido)
      const updatedEmployees = employees.map(e => 
        e.id === employee.id ? { ...e, isActive: !e.isActive } : e
      );
      setEmployees(updatedEmployees);

      // Enviamos la petición al backend
      await fetch(`${API_URL}/${employee.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !employee.isActive }), // Solo enviamos el campo que cambió
      });
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      fetchEmployees(); // Si falla, revertimos recargando la lista real
    }
  };

  const handleEditClick = (employee: Employee) => {
    setFormData({ fullName: employee.fullName, role: employee.role });
    setEditingId(employee.id);
    setView('form');
  };

  const handleNewClick = () => {
    setFormData({ fullName: '', role: '' });
    setEditingId(null);
    setView('form');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este empleado?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchEmployees();
    } catch (error) { console.error('Error al eliminar:', error); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.role) return;
    setLoading(true);

    try {
      let method = 'POST';
      let url = API_URL;

      if (editingId) {
        method = 'PATCH';
        url = `${API_URL}/${editingId}`;
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ fullName: '', role: '' });
        setEditingId(null);
        fetchEmployees();
        setView('list');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- NUEVO: Filtrado de empleados ---
  const filteredEmployees = employees.filter(emp => 
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Directorio de Empleados</h1>

      <div className="tabs">
        <button className={view === 'list' ? 'active-tab' : ''} onClick={() => setView('list')}>
          Ver Lista
        </button>
        <button className={view === 'form' ? 'active-tab' : ''} onClick={handleNewClick}>
          {editingId ? 'Editando Empleado' : 'Nuevo Empleado'}
        </button>
      </div>

      <div className="content-area">
        {view === 'form' && (
          <div className="card form-card">
            <h2>{editingId ? 'Editar Empleado' : 'Registrar Nuevo'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Cargo</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setView('list')}>Cancelar</button>
                <button type="submit" disabled={loading}>
                  {loading ? 'Guardando...' : (editingId ? 'Actualizar' : 'Guardar')}
                </button>
              </div>
            </form>
          </div>
        )}

        {view === 'list' && (
          <div className="list-section">
            {/* --- NUEVO: Buscador --- */}
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="🔍 Buscar por nombre o cargo..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid">
              {filteredEmployees.length === 0 ? (
                 <p className="empty-msg">No se encontraron resultados.</p>
              ) : (
                filteredEmployees.map((emp) => (
                  <div key={emp.id} className={`card employee-card ${!emp.isActive ? 'card-inactive' : ''}`}>
                    <div className="card-info">
                      <h3>{emp.fullName}</h3>
                      <p className="role">{emp.role}</p>
                      {/* Badge con click para toggle */}
                      <button 
                        className={`status-badge ${emp.isActive ? 'active' : 'inactive'}`}
                        onClick={() => handleToggleStatus(emp)}
                        title="Click para cambiar estado"
                      >
                        {emp.isActive ? '● Activo' : '○ Inactivo'}
                      </button>
                    </div>
                    <div className="card-actions">
                      <button className="btn-icon edit" onClick={() => handleEditClick(emp)}>✏️</button>
                      <button className="btn-icon delete" onClick={() => handleDelete(emp.id)}>🗑️</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;