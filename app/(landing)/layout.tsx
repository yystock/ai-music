const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen overflow-hidden ">
      <div className="min-h-screen w-full">{children}</div>
    </main>
  );
};

export default LandingLayout;
