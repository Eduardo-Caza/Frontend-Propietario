import './App.css';
// import { PaginaInicial } from './pages/PaginaInicial.jsx';
// import { Productos } from './pages/Productos.jsx';
// import Ingresar from './pages/Ingresar.jsx';
import { Registrar } from './pages/registro/Registro.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthProvider';
import Auth from './layout/Auth';
// import { PrivateRoute } from './routes/PrivateRoute.jsx';
// import Forgot from './pages/Forgot.jsx';
import { NoEncontrada } from './pages/NoEncontrada.jsx';
// import { Confirmar } from './pages/ConfirmarEmail';
// import { Confirmartienda } from './pages/confirmartienda.jsx';
// import Restablecer from './pages/Restablecer';
// import Listar from './pages/Listar.jsx';
// import Crear from './pages/Crear.jsx';
// import BuscarProducto from './pages/BuscarProducto.jsx';
// import Dashboard from './layout/Dashboard.jsx';
// import DashboardAdmin from './layout/DashboardAdmin.jsx';
// import Listartienda from './pages/Listartienda.jsx';
// import Confirmacion_registro_tienda from './pages/Confirmacion_registro_tienda.jsx';
// import CrearProducto from './pages/CrearProductos.jsx';
// import AdministrarTienda from './pages/AdministrarTienda.jsx';
// import AdministrarProducto from './pages/AdministrarProducto.jsx';
// import Terminos from './pages/Terminos.jsx';
// import ApkDownload from './pages/ApkDownload.jsx';
// import Moderadores from './pages/Moderadores.jsx';
// import CrearModerador from './pages/CrearModerador.jsx';
// import Listartiendaadmin from './pages/Listatiendaadmin.jsx';
// import TablaProductosAdmin from './components/TablaProductosAdmin.jsx';
import PaginaInicial from "./pages/paginaInicial/Paginainicial.jsx"
import Home from "./pages/Administrador/Home.jsx"
import List from './pages/list/List.jsx';
import Single from './pages/single/Single.jsx'
import Login from './pages/login/Login.jsx'
import New from './pages/new/New.jsx'
import Add from './pages/add/Add.jsx';
import RegisterProduct from "./pages/add/Add.jsx";
import RecuperarPassword from "./pages/forgotUserPassword/forgotUserPassword.jsx";
import Mods from './pages/mods/Mods.jsx';
import Acount from './pages/acount/Acount.jsx';
import Users from './pages/users/Users.jsx';
import NewT from './pages/newT/NewT.jsx';
import NewU from './pages/newU/NewU.jsx'
import Lmod from './pages/Lmod/Lmod.jsx';
import {Actualizar} from './pages/UpdateEmail/UpdateEmail.jsx';
import Profile from './pages/profile/Profile.jsx';
import ProfileU from './pages/profileU/profileU.jsx';
import {Confirmar} from './pages/Confirmemail/Confirmemail.jsx';
import { Confirmartienda } from './pages/Confirmtienda/confirmtienda.jsx';
import { productInputs, userInputs, tiendaInputs, moderadorInputs } from "./formSource";
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext.jsx';
import "./style/dark.scss"

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<PaginaInicial />} />
            <Route path="/" element={<Auth />}>
              {/* <Route path="ingresar" element={<Ingresar />} /> */}
              {/* <Route path="registrar" element={<Registrar />} />
              <Route path="usuario/confirmar/:token" element={<Confirmar />} />
              <Route path="/confirmartienda/:tokentienda" element={<Confirmartienda />} />
              <Route path="forgot/:id" element={<Forgot />} />
              <Route path="/usuario/recuperar-password/:token" element={<Restablecer />} />
              <Route path="dashboardadmin" element={<DashboardAdmin />} />
              <Route path="dashboardadmin/crearmoderador" element={<CrearModerador />} />
              <Route path="dashboardadmin/listartiendaadmin" element={<Listartiendaadmin />} />
              <Route path="/listarproductosadmin/:tiendaId" element={<Listarproductosadmin />} />
              <Route path="productos/:tiendaId" element={<TablaProductosAdmin />}/>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="dashboard/listar" element={<Listar />} />
              <Route path="dashboard/confirmacion" element={<Confirmacion_registro_tienda />} />
              <Route path="dashboard/crear" element={<Crear />} />
              <Route path="dashboard/listartienda" element={<Listartienda />} />
              <Route path="dashboard/buscar" element={<BuscarProducto />} />
              <Route path="dashboard/crearproducto" element={<CrearProducto />} />
              <Route path="dashboard/administrartienda" element={<AdministrarTienda />} />
              <Route path="dashboard/actualizarproducto" element={<AdministrarProducto />} />
              <Route path="terminos" element={<Terminos />} />
              <Route path="apk-download" element={<ApkDownload />} /> */}
              {/* <Route path="moderadores" element={<Moderadores />} /> */}
              <Route path="home" element={<Home />} />
              <Route path="/propietario/confirmar/:token" element={<Confirmar />} />
              <Route path="/propietario/confirmartienda/:tokentienda" element={<Confirmartienda />} />
              <Route path="/propietario/actualizar/:token" element={<Actualizar />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Registrar />} />
              <Route path="paginainicial" element={<PaginaInicial />} />
              <Route path="/propietario/recuperar-password/:token" element={<RecuperarPassword />} />
              <Route path="loginMod" element={<Lmod />} />
              <Route path="/propietario/perfil/:id" element={<Profile modId={localStorage.getItem("id_usuario")} />} />
              <Route path="tiendas">
                <Route index element={<List/>}/>
                <Route path="/tiendas/:id" element={<Single />} />
                <Route path="newt" element={<NewT inputs={tiendaInputs} title="Agregar nueva Tienda"/>} />
              </Route>
              <Route path="productos">
                <Route index element={<Mods/>}/>
                <Route path=":modId" element={<Acount />} />
                <Route path="add" element={<NewU/>} />;
              </Route>
              <Route path="users">
                <Route index element={<Users/>}/>
                <Route path=":id" element={<ProfileU />} />
                {/* <Route path="newU" element={<NewU inputs={userInputs} title="Agregar Nuevo Usuario"/>} /> */}
              </Route>
              <Route path="*" element={<NoEncontrada />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
