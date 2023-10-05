import './App.css';
import { search, getContent } from './api';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [linkList, setLinkList] = useState([]);
  const [messageOpen, setMessageOpen] = useState(false);
  const [popOpen, setPopOpen] = useState(false);
  const [autopromptChecked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
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
        const data = await search(selectedText, autopromptChecked);
        const firstPage = await getContent(data[0].id);
        setLinkList(data);
        const firstContent = document.getElementById("firstContent");
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
      <div className='metaphor-tools'>
        <Button id="highlight-button" className="sticky-button" variant="contained" onClick={getSelectedText}>Search for it</Button>
        <br />
        <FormControlLabel control={<Switch checked={autopromptChecked} onChange={handleChange} />} label="Autoprompt" />
      </div>
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
          <h3><b className='my-statement'>Here is our recommended content :)</b></h3>
          <div id="firstContent"></div>
          <hr />
          <h3><b className='my-statement'>Links you may find helpful :)</b></h3>
            {
              linkList.map((item, key) => {
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
        <h3>Why searches currently needs to be prompt engineered</h3>
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
        <h3>If you don't want to think about prompting</h3>
        <p>
          We are working hard on eliminating the need to prompt engineer. However, in the meantime, we have solutions that work very well and might 
          actually have added benefits for an LLM.
        </p>
        <h3>Autoprompting</h3>
        <p>
          If you set the useAutoprompt flag to true, you can input any text as a query, we will transform that query into a Metaphor-optimized query, and then you should receive fairly high quality results. This is extremely powerful because it means that you can input an entire user input to your LLM as a query and get relevant results. No extra prompt chaining is needed, as long as your system can determine that the Metaphor API must be called.
        </p>
      </article>
      <article>
        <h1>Metaphor AI: Illuminating the World's Knowledge in Next-Generation Documents</h1>
        <h3>Description:</h3>
        <p>In a rapidly evolving digital landscape, where information is both abundant and complex, the project stands at the forefront of innovation. I proudly introduce the next generation of documents, empowered by Metaphor AI, a groundbreaking technology that brings the world's knowledge to everything. If we truly launch this project and make it real, it would be impactful.</p>
        <p>The project's mission is to democratize access to knowledge. Whether you're a student, a professional, a researcher, or anyone seeking information, our next-generation documents ensure that you're always at the forefront of what's known. Imagine the potential for education, decision-making, and innovation when the entire world's knowledge is at your fingertips.</p>
        <h3>The Vision:</h3>
        Imagine a world where documents aren't just static collections of words and data, but living entities capable of harnessing the collective intelligence of the internet. Our project envisions a future where documents evolve into dynamic, interactive, and deeply insightful sources of information.
        <h3>Metaphor AI - A Game Changer:</h3>
        At the heart of this revolutionary shift is Metaphor AI. This cutting-edge technology possesses the unique ability to comprehend, contextualize, and augment documents with real-time insights from the vast ocean of global knowledge. Metaphor AI is not just a tool; it's the bridge between human intellect and the ever-expanding digital universe.
        <h3>Key Features:</h3>
        <p><b>Real-Time Knowledge Integration:</b> Metaphor AI continuously scans the internet, synthesizing the most current and relevant information to enrich your documents. Say goodbye to outdated, static content.</p>
        <p><b>Contextual Understanding:</b>  Our AI comprehends the context of your documents, ensuring that the information it adds is not only accurate but also aligned with your goals.</p>
        <p><b>Interactive Elements:</b>The new-generation documents are not just informative but interactive. Embed search with AI power seamlessly.</p> 
        <p><b>Dynamic Updates:</b> Documents powered by Metaphor AI evolve as new information becomes available. This ensures that your documents remain relevant and valuable over time.</p>
      </article>
      <article>
        <h1>Quiz book playground</h1>
        <em>try some relaxing quizes and have fun!</em>
        <h3>General knowledge</h3>
        <p>How many time zones are there in Russia?</p>
        <p>What’s the national flower of Japan?</p>
        <h3>World geography</h3>
        <p>What country has the most islands in the world?</p>
        <p>What’s the capital of Canada?</p>
        <h3>Language, literature & art</h3>
        <p>Name the best-selling book series of the 21st century?</p>
        <p>Which language has the most words</p>
        <p>Which artist painted the ceiling of the Sistine Chapel in Rome?</p>
        <h3>History & fashion</h3>
        <p>Who invented the World Wide Web, and when?</p>
        <p>Who invented the iconic Little Black Dress?</p>
        <h3>Film & TV</h3>
        <p>What is the name of the coffee shop in the sitcom Friends?</p>
        <p>Name Disney’s first film?</p>
      </article>
    </div>
  );
}

export default App;
