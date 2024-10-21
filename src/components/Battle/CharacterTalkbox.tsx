export const CharacterTalkbox = ({ onEndTalk }: { onEndTalk: () => void }) => {
	setTimeout(onEndTalk, 1000);
	return (
		<div>CharacterTalkbox</div>
	)
}
