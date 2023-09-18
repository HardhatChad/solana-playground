import styled, { css } from "styled-components";

import Tab from "./Tab";
import Button from "../../Button";
import Img from "../../Img";
import { Id } from "../../../constants";
import { PgExplorer, PgTheme, PgWallet } from "../../../utils/pg";
import { useExplorer, useKeybind, useWallet } from "../../../hooks";

export const Tabs = () => {
  const { explorer } = useExplorer();

  // Close the current tab with keybind
  useKeybind(
    "Alt+W",
    () => {
      if (PgExplorer.currentFilePath) {
        PgExplorer.closeFile(PgExplorer.currentFilePath);
      }
    },
    []
  );

  return (
    <Wrapper id={Id.TABS}>
      <TabsWrapper>
        {explorer.tabs.map((path, i) => (
          <Tab key={path} path={path} index={i} />
        ))}
      </TabsWrapper>
      <Wallet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => css`
    ${PgTheme.convertToCSS(theme.components.tabs.default)};
  `}
`;

const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  ${PgTheme.getScrollbarCSS({ height: "0.25rem !important" })};
`;

const Wallet = () => {
  const { wallet } = useWallet();

  if (!wallet) return null;

  return (
    <WalletWrapper>
      <Button
        onClick={() => (PgWallet.show = !PgWallet.show)}
        kind="icon"
        fontWeight="bold"
      >
        <Img src="/icons/sidebar/wallet.png" alt="Wallet" />
        Wallet
      </Button>
    </WalletWrapper>
  );
};

const WalletWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    & > button {
      background: ${theme.colors.default.bgPrimary};
      border-top-left-radius: ${theme.default.borderRadius};
      border-bottom-left-radius: ${theme.default.borderRadius};
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      & img {
        filter: invert(0.5);
        margin-right: 0.375rem;
      }

      &:hover img {
        filter: invert(${theme.isDark ? 1 : 0});
      }
    }
  `}
`;
