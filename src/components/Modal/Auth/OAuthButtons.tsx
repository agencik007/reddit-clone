import React, { useEffect } from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { doc, setDoc } from '@firebase/firestore';
import { User } from '@firebase/auth';

const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

    const createUserDocument = async (user: User) => {
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    };

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred]);

    return (
        <Flex direction='column' width='100%' mb={4}>
            <Button
                variant='oauth'
                isLoading={loading}
                mb={2}
                onClick={() => signInWithGoogle()}
            >
                <Image
                    src='/images/googlelogo.png'
                    height='20px'
                    mr={4}
                    alt='google logo'
                />
                Continue with Google
            </Button>
            <Button variant='oauth'>Some Other Provider</Button>
            {error && (
                <Text textAlign='center' fontSize='10pt' color='red' mt={2}>
                    {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
                </Text>
            )}
        </Flex>
    );
};

export default OAuthButtons;
