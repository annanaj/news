const formatPublishedDate = (dateString: string): string => {
	const year = dateString.substring(0, 4);
	const month = dateString.substring(4, 6);
	const day = dateString.substring(6, 8);
	return `${year}-${month}-${day}`;
};

export default formatPublishedDate;
