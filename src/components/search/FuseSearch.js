import { useStaticQuery, graphql } from 'gatsby'
import { useGatsbyPluginFusejs } from 'react-use-fusejs'
import { createRef, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Form } from './input';
import { Search } from '@styled-icons/fa-solid/Search';
import { HitsWrapper } from './index';
import { css } from '@emotion/react';


export default function FuseSearch(hitsAsGrid) {
    const data = useStaticQuery(graphql`
      {
        fusejs {
          index
          data
        }
      }
    `)

  const [query, setQuery] = useState('')
  const result = useGatsbyPluginFusejs(query, data.fusejs, {threshold: 0.4})

  const inputReference = useRef(null);

  const [focus, setFocus] = useState(true);

  const displayResult = query.length > 0 && focus ? 'showResults' : 'hideResults';

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  const collapse = (props) => css`
  width: 0;
  cursor: pointer;
  color: ${(props) => props.theme.lightBlue};
  + ${SearchIcon} {
    color: white;
  }
  ${(props) => props.focus && focus()}
  margin-left: ${(props) => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${(props) => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${(props) => props.theme.gray};
  }
`;

  const expand = (props) => css`
  background: ${(props) => props.theme.veryLightGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0.3em;
  }
`;

  const collapseExpand = (props) => css`
  ${(props) => (props.collapse ? collapse() : expand())}
`;

  const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: white;
  transition: ${(props) => props.theme.shortTrans};
  border-radius: ${(props) => props.theme.smallBorderRadius};
  {collapseExpand}
`;

  const SearchIcon = styled(Search)`
  position: absolute;
  left: 15px;
  width: 1em;
  pointer-events: none;
`;

  const preventSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const styles = {
    padding: "10",
    border: "thick double #32a1ce",
    marginBottom: "1em",
  };

  return (
    <div>
         <Form className={'formElement'} onSubmit={preventSubmit}>
            <SearchIcon />
           <Input
             onFocus={() => setFocus(true)}
             className={'searchInput '}
             type="text"
             value={query}
             placeholder="Search"
             aria-label="Search"
             onChange={handleChange}
             ref={inputReference}
             autoFocus
           />
         </Form>

        <HitsWrapper
          className={'hitWrapper ' + displayResult}
          show={query.length > 0 && focus}
          asGrid={hitsAsGrid}
        >
            {result.map(({ item }) => (
              <a href={item.slug}>
                 <ul style={styles}>
                   <li key={item.id} style={{ padding: '1em 1em 1em 1em' }}>{item.title}</li>
                   <li style={{ padding: '1em 1em 1em 1em' }}>{item.excerpt}</li>
                 </ul>
              </a>
            ))}

          {/*  /!*<PoweredBy />*!/*/}
        </HitsWrapper>
     </div>
  )
}
