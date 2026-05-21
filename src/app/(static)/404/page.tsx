import PageNotFound from "@/components/PageNotFound";
import ClientMetadata from "@/components/Client/ClientMetadata/ClientMetadata";
const ErrorPage: React.FC = () => {
  return (
    <>
      <ClientMetadata title="404 Not Found | Taxi Liên Tỉnh" isIndex={false} />
      <PageNotFound />
    </>
  );
};

export default ErrorPage;
