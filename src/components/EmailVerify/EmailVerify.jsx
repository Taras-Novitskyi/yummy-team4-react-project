import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { verify } from 'redux/auth/operations';
import { selectError, selectIsLoading } from 'redux/auth/selectors';

import {
  ContentWrapper,
  StyledWrapper,
  ButtonWrapper,
  Title,
  ErrorText,
  LoaderWrapper,
} from './EmailVerify.styled';
import { SingInButton } from 'components/Button/Button';
import { MiniLoader } from 'components/Loader/Loader';

export const EmailVerify = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const EmailVerification = async verificationToken => {
      await dispatch(verify(verificationToken));
    };
    EmailVerification(params.verificationToken);
  }, [dispatch, params.verificationToken]);

  return (
    <>
      <StyledWrapper>
        <ContentWrapper>
          {!error ? (
            <Title>Email verified!</Title>
          ) : (
            <ErrorText>{error}</ErrorText>
          )}
          <ButtonWrapper>
            <SingInButton>SigngIn</SingInButton>
          </ButtonWrapper>
        </ContentWrapper>
        <LoaderWrapper> {isLoading && <MiniLoader />}</LoaderWrapper>
      </StyledWrapper>
    </>
  );
};
