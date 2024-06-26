import { useStaticQuery, graphql } from 'gatsby'
import { useGatsbyPluginFusejs } from 'react-use-fusejs'
import { createRef, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Form } from './input';
import { Search } from '@styled-icons/fa-solid/Search';
import { HitsWrapper } from './index';


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

  const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: white;
  transition: ${(props) => props.theme.shortTrans};
  border-radius: ${(props) => props.theme.smallBorderRadius};
`;

  const SearchIcon = styled(Search)`
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
         <form className={'formElement'} onSubmit={preventSubmit}>
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
           >
           </Input>
         </form>

        <HitsWrapper
          className={'hitWrapper ' + displayResult}
          show={query.length > 0 && focus}
          asGrid={hitsAsGrid}
        >
          { console.log('result:', result)}
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
