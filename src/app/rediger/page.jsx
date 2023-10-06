"use client"

import styles from "../page.module.css"
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {decode} from 'html-entities';
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";

async function sendArticle(article,userToken) {
  try{
    const config = {
      headers: { 
        'Authorization': 'Bearer ' + userToken
      }
    }
    const data = await axios.post(
      `https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/`,
      article,
      config
      )
    return data
  }
  catch (error){
    console.log({erreur : {error}})
  }
}


export default function App() {
  const userToken = useAppSelector((state) => state.authReducer.userToken)
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
        const decoded = decode(editorRef.current.getContent())
        const wordsP1 = decoded.split('<h1>')[1];
        const title = wordsP1.split('</h1>')[0];
        const article = {article : decoded, title : title}
        sendArticle(article,userToken)
    }
  };

  return (
    <main className={styles.main}>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_KEY_TINY_CLOUD}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'code',"charmap",'tinymcespellchecker'
          ],
          spellchecker_language: 'fr',
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help' + 'code'+'charmap',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </main>
  );
}