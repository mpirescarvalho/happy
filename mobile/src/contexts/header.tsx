import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface HeaderData {
  shown: boolean;
  setShown: Dispatch<SetStateAction<boolean>>;
}

const HeaderContext = createContext<HeaderData>({} as HeaderData);

const HeaderProvider: React.FC = ({ children }) => {
  const [shown, setShown] = useState(true);

  return (
    <HeaderContext.Provider value={{ shown, setShown }}>
      {children}
    </HeaderContext.Provider>
  );
};

export function useHeader() {
  const context = useContext(HeaderContext);
  const data: [boolean, Dispatch<SetStateAction<boolean>>] = [
    context.shown,
    context.setShown,
  ];
  return data;
}

export default HeaderProvider;
