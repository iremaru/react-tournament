import { ChangeEventHandler, FC, SetStateAction, useState } from 'react';
import { MemberInfo, MemberPair } from '../../models/member';
import { getPairs } from '../../api/rollPairsRequests';
import './member-roller.scss';

const initialMembers: MemberInfo[] = [
	{
		memberName: 'NoName',
	},
];

export const MemberRoller: FC = () => {
	const [members, setMembers] = useState<MemberInfo[]>(initialMembers);
	const [pairs, setPairs] = useState<MemberPair[]>([]);
	const [newName, setNewName] = useState<string>('No name');

	function changeName(e: { target: { value: SetStateAction<string>; }; }) {
		setNewName(e.target.value);
	}
	function addNewMember() {
		setMembers((old) => [...old, { memberName: newName }]);
		setNewName('');
	}

	function rollMembers() {
		setPairs(getPairs(members));
	}

	return (
		<section className='section_roll'>
			<div className='roll_add-new'>
				<input onChange={changeName} value={newName} />
				<button onClick={addNewMember}>New Member</button>
			</div>
			<div>
				{members.map((member, i: number) => (
					<p key={`member-${i}`}>{member.memberName}</p>
				))}
			</div>
			<div>
				<button onClick={rollMembers}>Roll</button>
			</div>
			<div>
				{pairs.map((pair: MemberPair, i: number) => (
					<div key={`member-${i}`} className="row-member">
						<p>
							<span className="member-from">{pair.FromWho?.memberName}</span>{' '}
							must gift to{' '}
							<span className="member-to">{pair.ToWho?.memberName}</span>
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
