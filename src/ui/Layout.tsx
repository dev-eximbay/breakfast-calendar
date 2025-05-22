import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main
      className="flex flex-col min-h-svh mx-auto max-w-[800px] bg-gray-100 "
      style={{
        scrollbarWidth: "none",
      }}>
      <header className="sticky top-0 w-full">
        <div className="flex h-16 items-center justify-between bg-gray-800 px-4 text-white">
          <div className="text-lg font-bold">EXIMBAY 조식 캘린더</div>
          <div className="flex items-center space-x-4">
            {/* <a href="/login" className="text-gray-300 hover:text-white">
              Login
            </a> */}
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="sticky bottom-0 w-full">
        <div className="flex h-16 flex-col items-center justify-center bg-gray-800 text-white">
          <p className="text-sm">© 2025 EXIMBAY. All rights reserved.</p>
          <p className="text-xs font-thin">
            Contact:{" "}
            <a
              className="font-normal text-blue-400"
              href="https://eximbay-hq.slack.com/archives/D067BLU52ES"
              target="_blank">
              Robin
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
};
