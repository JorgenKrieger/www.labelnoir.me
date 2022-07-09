// Libraries
import { SplitText } from '@cyriacbr/react-split-text';

// Component
const Split = ({ children }) => {
	return (
		<SplitText
			LineWrapper={({ lineIndex, children }) => (
				<div
					className="line"
					style={{ '--lineIndex': lineIndex }}
				>
					{children}
				</div>
			)}

			WordWrapper={({ wordIndex, countIndex, children }) => (
				<span
					className="word"
					style={{ '--wordIndex': wordIndex, '--wordCountIndex': countIndex, whiteSpace: 'pre' }}
				>
					{children}
				</span>
			)}

			LetterWrapper={({ letterIndex, countIndex, children }) => (
				<span
					style={{ '--letterIndex': letterIndex, '--letterCountIndex': countIndex }}
				>
					{children}
				</span>
			)}
		>
			{children}
		</SplitText>
	)
}

// Export
export default Split;