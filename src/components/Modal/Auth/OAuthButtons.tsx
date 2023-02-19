import React from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button
                variant="oauth"
                isLoading={loading}
                mb={2}
                onClick={() => signInWithGoogle()}
            >
                <Image
                    src="/images/googlelogo.png"
                    height="20px"
                    mr={4}
                    alt="google logo"
                />
                Continue with Google
            </Button>
            <Button variant="oauth">Some Other Provider</Button>
            {error && (
                <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
                    {error.message ===
                    'Firebase: Error (auth/popup-closed-by-user).'
                        ? 'Popup closed by user, try again'
                        : error.message}
                </Text>
            )}
        </Flex>
    );
};

export default OAuthButtons;
