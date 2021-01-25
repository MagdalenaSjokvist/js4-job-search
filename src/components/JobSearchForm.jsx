import React, { useState, useEffect, useContext } from "react"
import { JobContext } from "../contexts/JobContext"

export default function JobSearchForm() {
	const [searchString, setSearchString] = useState("")
	const { setJobList } = useContext(JobContext)

	function handleOnClick() {
		setSearchString(searchString.replace(" ", "+"))
		getJobList()
	}
	function getJobList() {
		const url = `https://us-central1-wands-2017.cloudfunctions.net/githubjobs?description=${searchString}/`
		fetch(url)
			.then((res) => res.json())
			.then((data) => setJobList(data))
	}

	return (
		<div>
			<label for="job-search">Search for jobs:</label>
			<input
				type="search"
				id="job-search"
				value={searchString}
				onChange={(event) => setSearchString(event.target.value)}
			/>
			<button onClick={handleOnClick}>Search</button>
		</div>
	)
}