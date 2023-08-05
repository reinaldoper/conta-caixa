import { Paper, styled, TextField, Button, Box/* ,  Avatar */, Pagination  } from "@mui/material";

export const StyledPagination = styled(Pagination)`
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: white;
    border-radius: 4px;

    & .MuiPaginationItem-root {
    margin: 0 4px;
    border-radius: 4px;
    cursor: pointer;
    color: #333;
    padding: 4px 8px;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f1f1f1;
    }

    &.Mui-selected {
        background-color: #007bff;
        color: #fff;
        /* Add other styles to make the active page element stand out */
    }
    }

    & .MuiPagination-ul {
    display: inline-flex;
    }
`;

export const CunstomSaldo = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    margin-top: 7.5%;
    margin-left: 5.5%;
    width: 17vw;
    height: 5vw;
    border-radius: 8px;
    background-color: #90ff17;
`

export const CunstomAvatar = styled('img')`
    display: flex;
    align-items: center;
    margin-top: 5rem;
    margin-right: 0;
    margin-bottom: 5rem;
    width: 20vw;
    margin-left: 10.5rem;
    hight: 20vw;
    background-color: #A9A9A9;
`

export const CunstomImg = styled('img')`
    display: flex;
    align-items: center;
    margin-top: 15rem;
    margin-right: 0;
    margin-bottom: 5rem;
    width: 40vw;
    margin-left: 25.5rem;
    hight: 40vw;
`

export const CunstomForm = styled('form')`
    display: flex;
    width: 100vw;
    hight: 100vh;
    flex-direction: column;
    align-items: center;
    margin-top: 10rem;
`
export const Cunstom = styled('div')`
    display: flex;
    width: 10vw;
    hight: 10vh;
    flex-direction: column;
    margin-top: 10rem;
`

export const CunstomDiv = styled(Box)`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 10vw;
    background-color: #00755c;
`


export const CunstomPaper = styled(Paper)`
    display: flex;
    width: 30rem;
    height: 35rem;
    flex-direction: column;
    padding: 0.5rem;
    align-items: center;
    justify-content: center;
    background-color: #90ff17;
`

export const CunstomField = styled(TextField)`
    display: flex;
    width: 70%;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
`

export const CunstomButton = styled(Button)`
    display: flex;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    width: 14.5rem;
`

export const CunstomBox = styled(Box)`
    display: flex;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    background-color: #00c16c;
`

export const InputBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    width: 70%;
`

export const CunstomList = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`