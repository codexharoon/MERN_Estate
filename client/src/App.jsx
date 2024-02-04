import {
  Home,
  About,
  Profile,
  Login,
  Signup,
  CreateListing,
  UpdateListing,
  Listing,
  Search,
} from "./pages";
import { Header, PrivateRoute } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listing/:lid" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlisting" element={<CreateListing />} />
          <Route path="updatelisting/:lid" element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
