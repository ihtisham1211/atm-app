import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/global/Layout";

const Home = React.lazy(() => import("./pages/Home"));

const App: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
