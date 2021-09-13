//-----------TYPE---------------
type TextObject = { 
	type ?: string,
	language ?: string,
	text ?: string,
}

type Url = {
	type ?: string,
	url ?: string,
}

type SeriesSummary = {
	resourceURI ?: string,
	name ?: string,
}

type ComicSummary = {
	resourceURI ?: string,
	name ?: string,
}

type ComicDate = {
	type ?: string,
	date ?: Date,
}

type ComicPrice = {
	type ?: string,
	price ?: number,
}

type Image = {
	path ?: string,
	extension ?: string,
}

type CreatorList = {
	available ?: number,
	returned ?: number,
	collectionURI ?: string,
	items ?: CreatorSummary[],
}

type CreatorSummary = {
	resourceURI ?: string,
	name ?: string,
	role ?: string,
}

type CharacterList = {
	available ?: number,
	returned ?: number,
	collectionURI ?: string,
	items ?: CharacterSummary[],
}

type CharacterSummary = {
	resourceURI ?: string,
	name ?: string,
	role ?: string,
}

type StoryList = {
	available ?: number,
	returned ?: number,
	collectionURI ?: string,
	items ?: StorySummary[],
}

type StorySummary = {
	resourceURI ?: string,
	name ?: string,
	type ?: string,
}

type EventList = {
	available ?: number,
	returned ?: number,
	collectionURI  ?: string,
	items ?:EventSummary [],
}

type EventSummary = {
	resourceURI ?: string,
	name ?: string,
}

type Comic = {
	id ?: number,
	digitalId ?: number,
	title ?:string
	issueNumber ?: number,
	variantDescription ?: string,
	description ?: string,
	modified ?: Date,
	isbn ?: string,
	upc ?: string,
	ean ?: string,
	issn ?: string,
	format ?: string,
	pageCount ?: number,
	textObjects ?: TextObject[],
	resourceURI ?: string,
	urls ?: Url[],
	series ?: SeriesSummary,
	variants ?: ComicSummary[],
	collections ?: ComicSummary[],
	collectedIssues ?: ComicSummary[],
	dates ?: ComicDate[],
	prices ?: ComicPrice[],
	thumbnail ?: string,
	images ?: Image[],
	creators ?: CreatorList,
	characters ?: CharacterList,
	stories ?: StoryList,
	events ?: EventList,
}

type ComicList = {
	available ?: number,
	returned ?: number,
	collectionURI ?: string,
	items ?: ComicSummary[],
}

type SeriesList = {
	available ?: number,
	returned ?: number,
	collectionURI ?: string,
	items ?: SeriesSummary[],
}

type Character = {
	id ?: number;
	name ?: string,
	description ?: string,
	modified ?: Date,
	resourceURI ?: string,
	urls ?: Url[],
	thumbnail ?: Image,
	comics ?: ComicList,
	stories ?: StoryList,
	events ?: EventList,
	series ?: SeriesList,
}

type DataContainer= {
	offset: number,
	limit: number,
	total: number,
	count: number,
	results: Comic[] | Character [],
}
