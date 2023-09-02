import Container from "../components/Container/Container";
import NavigationBar from "../components/NavigationBar/NavigationBar";
const ErrorPage = () => {
  return (
    <>
      <NavigationBar />
      <Container>
        <h1>Unexpected Error</h1>
      </Container>
    </>
  );
};
export default ErrorPage;
