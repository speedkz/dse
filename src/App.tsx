import { Provider } from "@/components/ui/provider";
import { LoginContainer } from "./pages/login";

function App() {
  return (
    <Provider>
      <LoginContainer />
    </Provider>
  );
}

export default App;
