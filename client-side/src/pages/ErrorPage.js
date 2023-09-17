import Container from "../components/Container/Container";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import Transition from "../components/Transition/Transition";
const ErrorPage = () => {
  return (
    <Transition>
      <NavigationBar />
      <Container>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Unexpected Error</h1>
      </Container>
    </Transition>
  );
};
export default ErrorPage;
