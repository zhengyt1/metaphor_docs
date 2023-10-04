import './App.css';
import { search, getContent } from './api';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';


function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [linkList, setLinkList] = useState([]);
  const [messageOpen, setMessageOpen] = useState(false);
  const [popOpen, setPopOpen] = useState(false);

  async function getSelectedText(event) {
    var selectedText = '';
    if (window.getSelection) {
      selectedText = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
      selectedText = document.selection.createRange().text;
    }
    if (selectedText) {
      try {
        setPopOpen(true);
        setAnchorEl(event.currentTarget);
        const data = await search(selectedText);
        const firstPage = await getContent(data[0].id);
        console.log(data);
        console.log(firstPage);
        setLinkList(data);
        const firstContent = document.getElementById("firstContent");
        console.log(firstPage.extract)
        firstContent.innerHTML = firstPage.extract;
      } catch (err) {
        alert("Some error: " + err);
      }
    } else {
      setMessageOpen(true);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
    setPopOpen(false);
    setLinkList([]);
  };

  return (
    <div className="App">
      <Snackbar
        anchorOrigin={{ 
          vertical: 'bottom',
          horizontal: 'left', 
        }}
        open={messageOpen}
        onClose={() => {
          setMessageOpen(false);
        }}
        message="nothing highlighted"
      />
      <Button id="highlight-button" className="sticky-button" variant="contained" onClick={getSelectedText}>Search for it</Button>
      <Popover
        id='simple-popover'
        open={popOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <div className='pop-over'>
          <h2><b className='my-statement'>Here is our recommended content :)</b></h2>
          <div id="firstContent"></div>
          <hr />
          <h2><b className='my-statement'>Other links you may find helpful :)</b></h2>
          
            {
              linkList.slice(1).map((item, key) => {
                return (
                    <p key={item.id}>
                      <a href={item.url} target="_blank" rel="noreferrer" >{item.title}</a>
                    </p> 
                )
              })
            }
        </div>
      </Popover>
      <article>
        <h1>Searching Guide</h1>
        <p>
          The Metaphor API is a one stop shop to connect your LLM to the internet. Using our /search endpoint, an LLM can query using natural language and return a list of relevant results. The Metaphor search model is especially well-suited for LLMs because its fully neural architecture allows you to query completely in natural language, across our highly curated index. And if a query doesn't benefit from neural search, we also support keyword search.
        </p>
        <p>
          Once there is a list of results, an LLM can decide which results are relevant and obtain cleaned HTML content. That content can then be fetched using the /contents endpoint, and your LLM could, for instance, summarize the results for the user. To see this exact flow in action, follow the Recent News Summarizer Example.
        </p>
        <h2>Why searches currently needs to be prompt engineered</h2>
        <p>
          Metaphor uses a transformer architecture to predict links given text, and it gets its power from having been trained on the way that people 
          talk about links on the Internet. This training produces a model that returns links that are both high in relevance and quality. However, 
          the model does expect queries that look like how people describe a link on the Internet. For example, 'best restaurants in SF" is a bad query, 
          whereas "Here is the best restaurant in SF:" is a good query.
        </p>
        <p>
          We know this limitation is annoying and we're actively working to eliminate the need (we're fairly close!). However, the model is extremely 
          powerful. In fact, we benchmark better than OpenAI embeddings and many other popOpen source embeddings on information retrieval benchmarks.
        </p>
        <h2>If you don't want to think about prompting</h2>
        <p>
          We are working hard on eliminating the need to prompt engineer. However, in the meantime, we have solutions that work very well and might 
          actually have added benefits for an LLM.
        </p>
        <h2>Autoprompting</h2>
        <p>
          If you set the useAutoprompt flag to true, you can input any text as a query, we will transform that query into a Metaphor-optimized query, and then you should receive fairly high quality results. This is extremely powerful because it means that you can input an entire user input to your LLM as a query and get relevant results. No extra prompt chaining is needed, as long as your system can determine that the Metaphor API must be called.
        </p>
        <h2>Keyword search</h2>
        <p>
          If you're unable to find relevant results for your use case, you should first talk to us because we believe our index and search should be able to support almost all use cases. However, as a fallback, we support keyword-based search if you specify search type as "keyword" in the /search endpoint. Additionally, keyword search can be useful if you need to perform searches that do not need to be semantic, or that require a more complete index.  
        </p>
      </article>
    </div>
  );
}

export default App;
