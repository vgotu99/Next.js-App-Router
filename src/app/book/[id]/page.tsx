const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <div>book/{id} page</div>;
};

export default Page;
