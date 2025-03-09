import { Provider } from "@/components/ui/provider";
import { LoginContainer } from "./pages/login";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Provider>
      <Toaster />
      <LoginContainer />
    </Provider>
  );
}

export default App;
