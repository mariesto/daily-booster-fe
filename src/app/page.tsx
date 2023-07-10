'use client'
import {JetBrains_Mono} from 'next/font/google'
import avatar from '../../public/pembalap-coder.png'
import Image from "next/image";
import styles from './page.module.css';
import {Avatar, Text, Grid, NextUIProvider, Container, normalColors} from "@nextui-org/react";
import React, {createContext} from "react";

// @ts-ignore
const Context = createContext()
const fontJetbrainsMono = JetBrains_Mono({subsets: ['greek'], weight: '500',})

export default async function Home() {
    const quotes = await getQuotes();

    return (
        <Container className={styles.container}>
            <Container className={styles.element}>
                <Image
                    src={avatar}
                    alt="Avatar" className={styles.avatar}
                    style={{ width: "25%", height: "30%", objectFit:"cover", objectPosition: "bottom", margin: "5% 35%" }}
                >
                </Image>
                {quotes.map((data:any, index:any) => {
                    return (
                        <div key={index}>
                            <Text color="warning" h1 className={fontJetbrainsMono.className} style={{ textAlign: "center" }}>
                                {data['content']}
                            </Text>
                            <Text color="primary" className={fontJetbrainsMono.className} style={{ textAlign: "center" }}> - {data['author']} - </Text>
                        </div>
                    )
                })}
            </Container>
        </Container>
    )
}

async function getQuotes() {
    const response = await fetch('http://localhost:8080/quotes', {cache: 'no-store'})
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    return jsonResponse
}