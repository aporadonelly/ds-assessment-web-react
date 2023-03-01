import {
    QueryClientConfig,
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";
  
  type QueryProviderWrapperProps = {
    children: React.ReactNode;
  };
  
  export const createQueryProviderWrapper = (config: QueryClientConfig = {}) => {
    const queryClient = new QueryClient({
      logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
      },
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
      ...config,
    });
  
    const Wrapper = ({ children }: QueryProviderWrapperProps) => {
      return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );
    };
  
    return Wrapper;
  };