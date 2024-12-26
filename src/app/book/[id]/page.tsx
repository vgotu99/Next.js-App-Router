import ClientComponent from "@/components/client-component";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      book/{id} page
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
};

export default Page;
