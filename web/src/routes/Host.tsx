import { Box, Button, Code, Title } from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BrandSpotify } from "tabler-icons-react";
import { getSpotifyAuthUrl } from "../api/spotify";
import showError from "../errors/showError";

const LoginWithSpotify = () => {
  const redirectUri = "http://localhost:3000/host";
  const { isLoading, error, data } = useQuery(["authUrl", redirectUri], () =>
    getSpotifyAuthUrl()
  );
  if (isLoading) return <Title>Loading...</Title>;
  if (error) return <Title>{`${error}`}</Title>;
  return (
    <Button
      onClick={() => {
        window.location.href = data;
      }}
      color="green"
      leftIcon={<BrandSpotify />}
    >
      Login with Spotify
    </Button>
  );
};

interface CodeCallbackProps {
  code: string;
}
const CodeCallback = (props: CodeCallbackProps) => {
  const navigate = useNavigate();
  const mutation = useMutation((code: string) => {
    return axios.post("http://localhost:3001/spotify/auth", { code });
  });
  useEffect(() => {
    mutation.mutate(props.code);
    if (mutation.error) {
      showError(mutation.error);
    }
    const { data } = mutation;
    navigate("/host", { replace: true });
  }, []);

  return (
    <Box>
      <Title>Loading...</Title>
      <Code>{props.code}</Code>
    </Box>
  );
};
const Host = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { isLoading, error, data, isFetching } = useQuery(
    "spotifyAuth",
    async () => {
      const { data } = await axios.get("http://localhost:3001/spotify/auth");
      return data;
    }
  );
  if (isLoading) return <Title>Loading...</Title>;
  if (error) return <Title>{`${error} hee`}</Title>;
  if (isFetching) return <Title>Loading...</Title>;
  if (code) {
    return <CodeCallback code={code} />;
  }
  if (!data.access_token || !data.refresh_token || !data.expiresIn) {
    return <LoginWithSpotify />;
  }
  return <Code>{JSON.stringify(data, null, 2)}</Code>;
};

export default Host;
