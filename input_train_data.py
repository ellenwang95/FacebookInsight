from textblob import TextBlob

classification_types = ['entertainment', 'food', 'art', 'funny/cute', 'psychology', 'news', 'misc', 'friend_post']

def validate_media_type(media_type_input):
	return media_type_input in ['vid', 'img', 'txt']

def validate_reaction_count(reaction_count_input):
	return reaction_count_input.isdigit()

def validate_classification(classification_input):
	return classification_input in classification_types


#get post data 
user_content = raw_input('Enter the User Content: ') #text input expected 
media_type = raw_input('Enter the Media Type: ') #vid for video, img for image, txt for plain text
while not validate_media_type(media_type):
	print('ERROR: The valid media types are: vid | img | txt. Pls try again.')
	media_type = raw_input('Enter the Media Type: ') 
reaction_count = raw_input('Enter the Reaction Count: ') #integer input expected 	
while not validate_reaction_count(reaction_count):
	print('ERROR: The reaction count must be a positive number. Pls try again.')
	reaction_count = raw_input('Enter the Reaction Count: ') 
classification = raw_input('Enter classification: ')
while not validate_classification(classification):
	print('ERROR: The classification types are: ')
	print(classification_types)
	classification = raw_input('Enter classification: ')

#print post data back 
print('User Content: %s') % user_content
print('Media Type: %s') % media_type
print('Reaction Count: %s') % reaction_count
print('Classification: %s') % classification

with open('train.csv', 'a') as f:
	f.write(user_content + ',' + classification + '\n') # python will convert \n to os.linesep




